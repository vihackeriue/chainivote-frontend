import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './style.css'; // (nếu bạn muốn thêm CSS tùy chỉnh)

const LoginPage = () => {
    return (
        <div className="login-page vh-100 vw-100 d-flex align-items-center justify-content-center m-0 p-0">
            <Container fluid className="g-0">
                <Row className="g-0 w-100 h-100">
                    {/* Cột trái: Form đăng nhập */}
                    <Col md={4} className="bg-white p-5 d-flex flex-column justify-content-center">
                        <div className="text-start mb-4">
                            <img src="/logo.png" alt="Logo" style={{ height: 30 }} className="mb-3" />
                            <h4 className="fw-bold">ĐĂNG NHẬP</h4>
                            <p className="text-muted mb-4">
                                Nhập tên đăng nhập và mật khẩu để vào hệ thống
                            </p>
                        </div>

                        <Form>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Tên đăng nhập</Form.Label>
                                <Form.Control type="text" placeholder="Nhập tên đăng nhập" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>
                                    mật khẩu
                                </Form.Label>
                                <Form.Control type="password" placeholder="Nhập mật khẩu" />
                            </Form.Group>

                            <Form.Check className="mb-3" type="checkbox" label="Remember me" />

                            <Button variant="primary" type="submit" className="w-100">
                                <i className="bi bi-box-arrow-in-right me-2"></i> Log In
                            </Button>
                        </Form>

                        <div className="text-center mt-4">
                            <p className="text-muted mb-2">Sign in with</p>
                            <div className="d-flex justify-content-center gap-3">
                                <i className="bi bi-google fs-4 text-danger"></i>
                                <i className="bi bi-facebook fs-4 text-primary"></i>
                                <i className="bi bi-twitter fs-4 text-info"></i>
                                <i className="bi bi-github fs-4"></i>
                            </div>
                        </div>
                        <div >
                            <a href="#" className="float-end small">Quên mật khẩu?</a>
                        </div>
                        <div className="text-center mt-4">
                            <p className="small text-muted">Bạn chưa có tài khoảnn? <a href="#">Đăng ký</a></p>
                        </div>

                    </Col>

                    {/* Cột phải: Ảnh + Quote */}
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

export default LoginPage;
