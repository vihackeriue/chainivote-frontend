import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import './style.css';

const candidates = [
    {
        img: 'https://randomuser.me/api/portraits/men/32.jpg',
        name: 'Walter White',
        role: 'Business',
        desc: 'Aliquam iure quaerat voluptatem praesentium possimus unde laudantium vel dolorum distinctio dire flow'
    },
    {
        img: 'https://randomuser.me/api/portraits/women/45.jpg',
        name: 'Sarah Jhonson',
        role: 'Marketing',
        desc: 'Labore ipsam sit consequatur exercitationem rerum laborum laudantium aut quod dolores exercitationem ut'
    },
    {
        img: 'https://randomuser.me/api/portraits/men/46.jpg',
        name: 'William Anderson',
        role: 'Maths',
        desc: 'Illum minima ea autem doloremque ipsum quidem quas aspernatur modi ut praesentium vel tque sed facilis at qui'
    },
    {
        img: 'https://randomuser.me/api/portraits/women/24.jpg',
        name: 'Amanda Jepson',
        role: 'Science',
        desc: 'Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur est laborum'
    },
    {
        img: 'https://randomuser.me/api/portraits/women/24.jpg',
        name: 'Amanda Jepson',
        role: 'Science',
        desc: 'Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur est laborum'
    }
];

const PollDetailPage = () => {
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

    return (
        <>
            <section id="about" className="about section py-5">
                <Container>
                    <Row className="align-items-center gy-4">
                        {/* Hình ảnh bên phải */}
                        <Col lg={6} className="order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
                            <img
                                src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"
                                className="img-fluid rounded"
                                alt="Blockchain Voting"
                            />
                        </Col>

                        {/* Nội dung bên trái */}
                        <Col lg={6} className="order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
                            <h3 className="fw-bold" style={{ fontSize: '1.75rem' }}>
                                Nền tảng bình chọn minh bạch ứng dụng Blockchain
                            </h3>
                            <p className="fst-italic text-muted">
                                Hệ thống của chúng tôi đảm bảo mọi lá phiếu được ghi nhận và không thể bị thay đổi, nhờ vào công nghệ Blockchain hiện đại.
                            </p>

                            {/* Danh sách có icon */}
                            <ul className="list-unstyled mb-4">
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Mọi cuộc bình chọn đều được ghi nhận minh bạch trên hệ thống sổ cái phân tán.
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Không ai có thể chỉnh sửa, xóa bỏ hay gian lận kết quả sau khi đã ghi nhận.
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Người dùng có thể kiểm tra lại lịch sử bình chọn bất kỳ lúc nào, hoàn toàn công khai.
                                </li>
                            </ul>

                            {/* Nút Read More */}
                            <a href="#" className="btn btn-success px-4 py-2 rounded-pill d-inline-flex align-items-center">
                                <span className="me-2">Tìm hiểu thêm</span>
                                <i className="bi bi-arrow-right"></i>
                            </a>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="py-5" id="candidates">
                <center>
                    <h2 className="mb-4"><b>Danh sách các ứng viên</b></h2>
                </center>

                <Container>
                    <Row className="gy-5">
                        {candidates.map((c, idx) => (
                            <Col md={6} lg={4} key={idx} className="text-center">
                                <div className="candidate-box position-relative">
                                    <div className="candidate-image-wrapper">
                                        <img src={c.img} alt={c.name} className="img-fluid rounded-circle candidate-img" />
                                        <button className="vote-button" onClick={() => handleShow(c)}>Chi tiết</button>
                                    </div>
                                    <h5 className="mt-3 mb-1 fw-bold">{c.name}</h5>
                                    <p className="fst-italic text-muted">{c.role}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    {/* Modal hiển thị chi tiết ứng viên */}
                    <Modal show={show} onHide={handleClose} centered>
                        {selectedCandidate && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title>{selectedCandidate.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="text-center">
                                    <img
                                        src={selectedCandidate.img}
                                        alt={selectedCandidate.name}
                                        className="rounded-circle mb-3"
                                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                    />
                                    <p className="text-muted fst-italic">{selectedCandidate.role}</p>
                                    <p>{selectedCandidate.desc}</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="success" onClick={() => alert(`Bạn đã bình chọn cho ${selectedCandidate.name}`)}>
                                        Bình chọn
                                    </Button>
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

export default PollDetailPage;
