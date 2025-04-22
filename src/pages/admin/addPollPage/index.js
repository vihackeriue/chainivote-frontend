import React, { useState } from 'react';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';

const AddPollPage = () => {
    const [poll, setPoll] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        options: ['']
    });

    const handleChange = (e) => {
        setPoll({ ...poll, [e.target.name]: e.target.value });
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...poll.options];
        updatedOptions[index] = value;
        setPoll({ ...poll, options: updatedOptions });
    };

    const addOption = () => {
        setPoll({ ...poll, options: [...poll.options, ''] });
    };

    const removeOption = (index) => {
        const updatedOptions = poll.options.filter((_, i) => i !== index);
        setPoll({ ...poll, options: updatedOptions });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Poll Data:', poll);
        // Gửi poll đến backend tại đây (nếu cần)
    };

    return (
        <Card className="p-4 mt-4 shadow">
            <h3 className="mb-4">Tạo Cuộc Khảo Sát</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Tiêu đề</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Nhập tiêu đề khảo sát"
                        value={poll.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        rows={3}
                        placeholder="Mô tả ngắn"
                        value={poll.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ngày bắt đầu</Form.Label>
                            <Form.Control
                                type="date"
                                name="startDate"
                                value={poll.startDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ngày kết thúc</Form.Label>
                            <Form.Control
                                type="date"
                                name="endDate"
                                value={poll.endDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Label className="mt-3">Các lựa chọn</Form.Label>
                {poll.options.map((option, index) => (
                    <Row key={index} className="mb-2">
                        <Col xs={10}>
                            <Form.Control
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Lựa chọn ${index + 1}`}
                                required
                            />
                        </Col>
                        <Col xs={2}>
                            {poll.options.length > 1 && (
                                <Button
                                    variant="danger"
                                    onClick={() => removeOption(index)}
                                >
                                    X
                                </Button>
                            )}
                        </Col>
                    </Row>
                ))}

                <Button variant="secondary" onClick={addOption} className="mb-3">
                    + Thêm lựa chọn
                </Button>

                <div>
                    <Button type="submit" variant="primary">
                        Tạo khảo sát
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default AddPollPage;
