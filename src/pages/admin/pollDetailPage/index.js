import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Button, Spinner, Alert, Card, Table, Image, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../../../constrants/constrant';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const AdminPollDetailPage = () => {
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


    const labels = Array.from({ length: 24 }, (_, i) => `Sprint ${i + 1}`);
    const data = {
        labels,
        datasets: [
            {
                label: 'Tasks',
                data: [
                    2, 10, 7, 11, 18, 13, 19, 14, 18, 11, 15, 8,
                    6, 10, 7, 11, 17, 14, 17, 12, 15, 11, 6, 3
                ],
                backgroundColor: 'rgba(66, 133, 244, 0.6)',
                borderRadius: 4,
                barThickness: 20,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 11 } },
            },
            y: {
                grid: { color: '#f0f0f0' },
                ticks: { beginAtZero: true, stepSize: 5 },
            },
        },
    };


    // biểu dồ 2
    const COLORS = ['#6366f1', '#f43f5e', '#10b981']; // tím, đỏ, xanh lá

    const data2 = [
        { name: 'Nguyễn Văn A', value: 45.2 },
        { name: 'Trần Thị B', value: 32.8 },
        { name: 'Lê Văn C', value: 22.0 }
    ];

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
            {/* biểu đồ 1 */}


            <Row className="gy-4">
                {/* Người thắng cuộc */}
                <Col lg={6}>
                    <Card className="shadow-sm h-100">
                        <Card.Body className="text-center">
                            {/* Kiểm tra thời gian */}
                            <Card.Title className="fw-bold">
                                {new Date(poll.endTime) < new Date()
                                    ? 'NGƯỜI THẮNG CUỘC'
                                    : 'NGƯỜI ĐANG DẪN ĐẦU'}
                            </Card.Title>

                            {data2.length > 0 && (
                                <>
                                    {/* Tìm đúng ứng viên theo tên top1 */}
                                    <img
                                        // src={poll.candidates?.find(c => c.name === data2[0].name)?.urlImage}
                                        src="https://thaka.bing.com/th/id/OIP.HHWQTFJA2CmSW75EPHUaXwHaHa?w=193&h=193&c=7&r=0&o=5&pid=1.7"
                                        alt={data2[0].name}
                                        className="rounded-circle my-3"
                                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                    />
                                    <h5 className="fw-bold">{data2[0].name}</h5>
                                    <p className="text-muted">Tỷ lệ bình chọn: {data2[0].value.toFixed(1)}%</p>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>


                {/* Top 3 Ứng viên */}
                <Col lg={6}>
                    <Card className="shadow-sm h-100">
                        <Card.Body>
                            <Card.Title className="fw-bold">TOP 3 ỨNG VIÊN</Card.Title>
                            <div style={{ width: '100%', height: 250 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={data2}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                                        >
                                            {data2.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <ListGroup variant="flush" className="mt-3">
                                {data2.map((item, idx) => (
                                    <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                                        <span>
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    width: 12,
                                                    height: 12,
                                                    backgroundColor: COLORS[idx],
                                                    borderRadius: '50%',
                                                    marginRight: 8
                                                }}
                                            ></span>
                                            {item.name}
                                        </span>
                                        <b>{item.value.toFixed(1)}%</b>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>


            </Row>

            {/* Biểu đồ Tasks Overview */}
            <Card className="shadow-sm my-4">
                <Card.Body>
                    <h6 className="mb-3 text-muted fw-bold">TỔNG QUAN ỨNG VIÊN</h6>
                    <div style={{ height: `${poll.candidates.length <= 5 ? 300 : poll.candidates.length * 60}px` }}>
                        <Bar
                            data={{
                                labels: poll.candidates.map(c => c.name),
                                datasets: [
                                    {
                                        label: 'Số lượt bình chọn',
                                        data: poll.candidates.map(c => c.voteCount),
                                        backgroundColor: 'rgba(66, 133, 244, 0.6)',
                                        borderRadius: 4,
                                        barThickness: 30,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false },
                                    tooltip: { enabled: true },
                                },
                                scales: {
                                    x: {
                                        grid: { display: false },
                                        ticks: { font: { size: 12 } },
                                    },
                                    y: {
                                        beginAtZero: true,
                                        grid: { color: '#f0f0f0' },
                                        ticks: { stepSize: 1 },
                                    },
                                },
                            }}
                        />
                    </div>
                </Card.Body>
            </Card>

            <section className="py-5" id="candidates">
                <Container>
                    <h2 className="mb-4 text-center"><b>Danh sách các ứng viên</b></h2>

                    <Table bordered hover responsive className="align-middle">
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '80px' }}></th>
                                <th>Họ tên</th>
                                <th>Mô tả</th>
                                <th className="text-center">Số lượt Bình chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {poll.candidates?.map((c) => (
                                <tr key={c.id}>
                                    <td className="text-center">
                                        <Image
                                            src={c.urlImage}
                                            alt={c.name}
                                            roundedCircle
                                            width={50}
                                            height={50}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td>{c.name}</td>
                                    <td className="text-muted small">{c.description || 'Không có mô tả'}</td>
                                    <td className="text-center">
                                        <Button size="sm" variant="primary" onClick={() => handleShow(c)}>
                                            Chi tiết
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Modal hiển thị chi tiết ứng viên */}
                    <Modal show={show} onHide={handleClose} centered>
                        {selectedCandidate && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title>{selectedCandidate.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="text-center">
                                    <img
                                        src={selectedCandidate.urlImage}
                                        alt={selectedCandidate.name}
                                        className="rounded-circle mb-3"
                                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                    />
                                    <p>{selectedCandidate.description}</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Đóng
                                    </Button>
                                </Modal.Footer>
                            </>
                        )}
                    </Modal>
                </Container>
            </section>


        </>
    );
};

export default AdminPollDetailPage;
