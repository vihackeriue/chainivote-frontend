import { Contract } from 'ethers';
import { BrowserProvider } from 'ethers';
import React, { useState } from 'react';
import { Form, Button, Col, Row, ProgressBar, Image } from 'react-bootstrap';
import { contractAbi, contractAddress } from '../../../constrants/constrant';
import { useNavigate } from 'react-router-dom';

const AddPollPage = () => {
    const [step, setStep] = useState(1);
    const initialState = {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'active',
        maxVotesPerVoter: '',
        image: '',
        candidates: [
            { name: '', description: '', image: '' },
            { name: '', description: '', image: '' }
        ]
    };
    const navigate = useNavigate();

    const [poll, setPoll] = useState(initialState);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setPoll({ ...poll, [e.target.name]: e.target.value });
    };


    const handleCandidateChange = (index, field, value) => {
        const updatedCandidates = [...poll.candidates];
        updatedCandidates[index][field] = value;
        setPoll({ ...poll, candidates: updatedCandidates });
    };

    const addCandidate = () => {
        setPoll({ ...poll, candidates: [...poll.candidates, { name: '', description: '', image: '' }] });
    };


    const validateStep1 = () => {
        const newErrors = {};
        if (!poll.title.trim()) newErrors.title = 'Vui lòng nhập tiêu đề';
        if (!poll.description.trim()) newErrors.description = 'Vui lòng nhập mô tả';
        if (!poll.startDate) newErrors.startDate = 'Chọn ngày bắt đầu';
        if (!poll.endDate) newErrors.endDate = 'Chọn ngày kết thúc';
        if (!poll.maxVotesPerVoter || isNaN(poll.maxVotesPerVoter)) newErrors.maxVotesPerVoter = 'Vui lòng nhập số phiếu tối đa';
        if (!poll.image) newErrors.image = 'Vui lòng chọn hình ảnh';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const validateStep2 = () => {
        const newErrors = {};
        poll.candidates.forEach((c, i) => {
            if (!c.name.trim()) newErrors[`name${i}`] = 'Tên không được để trống';
            if (!c.description.trim()) newErrors[`desc${i}`] = 'Mô tả không được để trống';

            if (!c.image) newErrors[`img${i}`] = 'Ảnh không được để trống';
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (step === 1 && validateStep1()) setStep(2);
        else if (step === 2 && validateStep2()) setStep(3);
    };


    // Lưu thông tin

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            file.preview = imageUrl;
            poll.image = file;
            setPoll({ ...poll });
        }
    };

    const handleCandidateImageChange = (index, file) => {
        const updatedCandidates = [...poll.candidates];
        file.preview = URL.createObjectURL(file);
        updatedCandidates[index].image = file;
        setPoll({ ...poll, candidates: updatedCandidates });
    };

    const uploadFileToLocalIPFS = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('http://localhost:5001/api/v0/add', {
            method: 'POST',
            body: formData
        });
        const data = await res.text();
        const cid = data.match(/Hash":\s*"(.*?)"/)[1];
        return `http://localhost:8080/ipfs/${cid}`;
    };

    const uploadJSONToLocalIPFS = async (obj) => {
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
        const file = new File([blob], 'data.json');
        return await uploadFileToLocalIPFS(file);
    };

    const handleSubmit = async () => {
        try {
            // Kết nối Metamask & smart contract
            const provider = new BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contract = new Contract(contractAddress, contractAbi, signer);

            // Upload hình ảnh chính của cuộc bình chọn lên IPFS
            const pollImageUrl = await uploadFileToLocalIPFS(poll.image);
            // Upload ảnh từng ứng viên lên IPFS
            const candidateWithUrls = await Promise.all(
                poll.candidates.map(async (c) => ({
                    ...c,
                    image: await uploadFileToLocalIPFS(c.image)
                }))
            );
            // Tạo file JSON chứa thông tin poll & ứng viên
            const address = await signer.getAddress();
            const pollDataWithUrls = {
                title: poll.title,
                description: poll.description,
                image: pollImageUrl,
                creator: address
            };
            // upload lên IPFS
            const pollCIDUrl = await uploadJSONToLocalIPFS(pollDataWithUrls);
            // Tạo cuộc bình chọn trên blockchain
            const tx1 = await contract.createPoll(Number(poll.maxVotesPerVoter), pollCIDUrl);
            await tx1.wait();
            const nextPollId = await contract.nextPollId();
            // Lấy ID lưu vào database
            const pollId = Number(nextPollId) - 1;

            // Upload từng ứng viên lên IPFS
            const candidateCIDs = await Promise.all(
                candidateWithUrls.map((c) => uploadJSONToLocalIPFS(c))
            );
            // lưu candidate lên blockchain
            const tx2 = await contract.addCandidatesToPoll(pollId, candidateCIDs);
            await tx2.wait();
            //  Tính ID của từng ứng viên
            const nextCandidateIdBefore = await contract.nextCandidateId();
            const candidateIds = candidateCIDs.map((_, i) => Number(nextCandidateIdBefore) + i);


            // Lưu toàn bộ thông tin poll & candidates vào database
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/api/polls", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: poll.title,
                    description: poll.description,
                    startDate: poll.startDate,
                    endDate: poll.endDate,
                    status: poll.status,
                    image: pollImageUrl,
                    pollId,
                    txHash: tx1.hash,
                    candidates: candidateWithUrls.map((c, i) => ({
                        ...c,
                        candidateId: candidateIds[i],
                        cid: candidateCIDs[i]
                    }))
                })
            });

            const result = await response.json();
            console.log("✅ Lưu DB thành công:", result);
            alert("🎉 Tạo cuộc bình chọn thành công!");
            setPoll(initialState);
            setStep(1);
            navigate('/poll-list');
        } catch (err) {
            console.error("Lỗi khi tạo cuộc bình chọn:", err);
            alert("Đã có lỗi xảy ra!");
        }
    };


    return (
        <div className="mt-4 mx-auto px-3" style={{ maxWidth: '1200px', height: 'calc(100vh - 120px)', overflowY: 'auto' }}>

            <ProgressBar
                now={(step / 3) * 100}
                className="mb-4"
                style={{ height: '4px' }}
                variant="warning"
            />

            {step === 1 && (
                <>
                    <h4 className="mb-4"><b>Thông tin cuộc bình chọn</b></h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control size="sm" name="title" value={poll.title} onChange={handleChange} isInvalid={!!errors.title} required />
                        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" size="sm" name="description" rows={3} value={poll.description} onChange={handleChange} isInvalid={!!errors.description} />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Số phiếu tối đa mỗi người</Form.Label>
                        <Form.Control size="sm" type="number" name="maxVotesPerVoter" value={poll.maxVotesPerVoter} onChange={handleChange} isInvalid={!!errors.maxVotesPerVoter} />
                        <Form.Control.Feedback type="invalid">{errors.maxVotesPerVoter}</Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Ngày bắt đầu</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="datetime-local"
                                    name="startDate"
                                    value={poll.startDate}
                                    onChange={handleChange}
                                    isInvalid={!!errors.startDate}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.startDate}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Ngày kết thúc</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="datetime-local"
                                    name="endDate"
                                    value={poll.endDate}
                                    onChange={handleChange}
                                    isInvalid={!!errors.endDate}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.endDate}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Trạng thái</Form.Label>
                        <Form.Select size="sm" name="status" value={poll.status} onChange={handleChange}>
                            <option value="0">Riêng tư</option>
                            <option value="1">Công khai</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control size="sm" type="file" onChange={handleImageChange} isInvalid={!!errors.image} />
                        {poll.image && <Image src={poll.image} height={60} className="mt-2" rounded />}
                        <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="text-end">
                        <Button size="sm" variant="primary" onClick={handleNextStep}>Tiếp theo</Button>
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <h4 className="mb-4"><b>Thông tin ứng viên</b></h4>
                    {poll.candidates.map((candidate, index) => (
                        <div key={index} className="mb-3 p-3 border rounded">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <Form.Label className="mb-0">Tên ứng viên {index + 1}</Form.Label>
                                {poll.candidates.length > 1 && (
                                    <Button size="sm" variant="danger" onClick={() => {
                                        const updated = poll.candidates.filter((_, i) => i !== index);
                                        setPoll({ ...poll, candidates: updated });
                                    }}>
                                        Xóa
                                    </Button>
                                )}
                            </div>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    size="sm"
                                    value={candidate.name}
                                    onChange={(e) => handleCandidateChange(index, 'name', e.target.value)}
                                    isInvalid={!!errors[`name${index}`]}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors[`name${index}`]}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    size="sm"
                                    rows={2}
                                    value={candidate.description}
                                    onChange={(e) => handleCandidateChange(index, 'description', e.target.value)}
                                    isInvalid={!!errors[`desc${index}`]}
                                />
                                <Form.Control.Feedback type="invalid">{errors[`desc${index}`]}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Ảnh ứng viên</Form.Label>
                                <Form.Control size="sm" type="file" onChange={(e) => handleCandidateImageChange(index, e.target.files[0])} isInvalid={!!errors[`img${index}`]} />
                                {candidate.image && <Image src={candidate.image} height={60} className="mt-2" rounded />}
                                <Form.Control.Feedback type="invalid">{errors[`img${index}`]}</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    ))}
                    <div className="text-end">
                        <Button size="sm" variant="outline-secondary" onClick={addCandidate} className="me-2">+ Thêm ứng viên</Button>
                        <Button size="sm" variant="secondary" onClick={() => setStep(1)} className="me-2">Quay lại</Button>
                        <Button size="sm" variant="primary" onClick={handleNextStep}>Tiếp theo</Button>
                    </div>
                </>
            )}

            {step === 3 && (
                <>
                    <h4 className="mb-4">Xác nhận thông tin</h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control size="sm" type="text" value={poll.title} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" rows={2} size="sm" value={poll.description} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Thời gian</Form.Label>
                        <Form.Control size="sm" type="text" value={`${poll.startDate} đến ${poll.endDate}`} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Số phiếu tối đa mỗi người</Form.Label>
                        <Form.Control size="sm" type="text" value={poll.maxVotesPerVoter} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Trạng thái</Form.Label>
                        <Form.Control size="sm" type="text" value={poll.status} readOnly />
                    </Form.Group>
                    {poll.image && <Image src={poll.image} height={80} rounded className="mb-3 d-block" />}

                    <h5 className="mt-3">Danh sách ứng viên:</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-sm">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Tên</th>
                                    <th>Mô tả</th>
                                    <th>Ảnh</th>
                                </tr>
                            </thead>
                            <tbody>
                                {poll.candidates.map((c, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{c.name}</td>
                                        <td>{c.description}</td>
                                        <td>{c.image && <Image src={c.image} height={40} rounded />} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-end">
                        <Button size="sm" variant="secondary" onClick={() => setStep(2)} className="me-2">Quay lại</Button>
                        <Button size="sm" variant="success" onClick={handleSubmit}>Tạo cuộc bình chọn</Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddPollPage;