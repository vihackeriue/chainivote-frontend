import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './style.css';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../../../constrants/constrant';

const PollDetailPage = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const handleShow = (candidate) => {
        setSelectedCandidate(candidate);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedCandidate(null);
    };

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/poll/${id}`);
                if (!res.ok) throw new Error('Không thể lấy dữ liệu');
                const data = await res.json();
                setPoll(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPoll();
    }, [id]);

    if (loading) {
        return <div className="text-center py-5"><Spinner animation="border" /></div>;
    }

    if (error) {
        return <Alert variant="danger" className="my-4 text-center">{error}</Alert>;
    }
    const handleVote = async () => {
        try {
            if (!window.ethereum) {
                alert('Vui lòng cài đặt MetaMask!');
                return;
            }

            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const contract = new ethers.Contract(contractAddress, contractAbi, signer);

            const tx = await contract.vote(poll.chainId, selectedCandidate.chainId);
            await tx.wait();

            alert(`Bình chọn cho ${selectedCandidate.name} thành công!`);
            setShow(false);
        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra khi bình chọn!');
        }
    };
    return (
        <>
            <section className="about section py-5">
                <Container>
                    <Row className="align-items-center gy-4">
                        <Col lg={6} className="order-1 order-lg-2">
                            <img
                                src={`${poll.urlImage}`}
                                className="img-fluid rounded"
                                alt={poll.title}
                            />
                        </Col>
                        <Col lg={6} className="order-2 order-lg-1">
                            <h3 className="fw-bold" style={{ fontSize: '1.75rem' }}>{poll.title}</h3>
                            <p className="fst-italic text-muted">{poll.description}</p>
                            <ul className="list-unstyled">
                                <li><strong>Thời gian bắt đầu:</strong> {new Date(poll.startTime).toLocaleString()}</li>
                                <li><strong>Thời gian kết thúc:</strong> {new Date(poll.endTime).toLocaleString()}</li>
                                <li><strong>Chain ID:</strong> {poll.chainId}</li>
                                <li><strong>Trạng thái:</strong> {poll.status === 1 ? "Công khai" : "Riêng tư"}</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="py-5" id="candidates">
                <Container>
                    <center><h2 className="mb-4"><b>Danh sách các ứng viên</b></h2></center>
                    <Row className="gy-5">
                        {poll.candidates?.map((c) => (
                            <Col md={6} lg={4} key={c.id} className="text-center">
                                <div className="candidate-box position-relative">
                                    <div className="candidate-image-wrapper">
                                        <img
                                            src={`${c.urlImage}`}
                                            alt={c.name}
                                            className="img-fluid rounded-circle candidate-img"
                                        />
                                        <button className="vote-button" onClick={() => handleShow(c)}>Chi tiết</button>
                                    </div>
                                    <h5 className="mt-3 mb-1 fw-bold">{c.name}</h5>
                                    <p className="fst-italic text-muted">Ứng viên</p>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    <Modal show={show} onHide={handleClose} centered>
                        {selectedCandidate && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title>{selectedCandidate.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="text-center">
                                    <img
                                        src={`${selectedCandidate.urlImage}`}
                                        alt={selectedCandidate.name}
                                        className="rounded-circle mb-3"
                                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                    />
                                    <p>{selectedCandidate.description}</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="success"
                                        onClick={handleVote}
                                    >
                                        Bình chọn
                                    </Button>
                                    <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                                </Modal.Footer>
                            </>
                        )}
                    </Modal>
                </Container>
            </section>
        </>
    );
};

export default PollDetailPage;
