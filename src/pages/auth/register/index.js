import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './style.css'; // dùng lại CSS để giữ giao diện full màn hình

const RegisterPage = () => {
    return (
        <div className="login-page vh-100 vw-100 d-flex align-items-center justify-content-center m-0 p-0">
            <Container fluid className="g-0">
                <Row className="g-0 w-100 h-100">
                    {/* Form đăng ký */}
                    <Col md={4} className="bg-white p-5 d-flex flex-column justify-content-center">
                        <div className="text-start mb-4">
                            <img src="/logo.png" alt="Logo" style={{ height: 30 }} className="mb-3" />
                            <h4 className="fw-bold">ĐĂNG KÝ</h4>
                            <p className="text-muted mb-4">
                                Đăng ký tài khoản để sử dụng hệ thống
                            </p>
                        </div>

                        <Form>
                            <Form.Group className="mb-3" controlId="formFullName">
                                <Form.Label>Tên đầy đủ</Form.Label>
                                <Form.Control type="text" placeholder="Nhập tên đầy đủ" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email </Form.Label>
                                <Form.Control type="email" placeholder="Nhập email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="text" placeholder="Nhập số điện thoại" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control type="password" placeholder="Nhập mật khẩu" />
                            </Form.Group>

                            <Button variant="success" type="submit" className="w-100">
                                <i className="bi bi-person-plus-fill me-2"></i> Tạo tài khoản
                            </Button>
                        </Form>

                        <div className="text-center mt-4">
                            <p className="small text-muted">
                                Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
                            </p>
                        </div>
                    </Col>

                    {/* Ảnh bên phải */}
                    <Col
                        md={8}
                        className="d-none d-md-flex align-items-center justify-content-center"
                        style={{
                            backgroundImage: 'url(https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            minHeight: '100vh'
                        }}
                    >
                        <div className="text-white text-center px-4">
                            <h4 className="fw-bold">Chào mừng bạn đến với website!</h4>
                            <p className="fst-italic">
                                “Hệ thống Bình chọn minh bạch”<br />
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RegisterPage;
