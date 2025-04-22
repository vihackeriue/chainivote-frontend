import { memo } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button, Dropdown, Form, FormControl, Image } from 'react-bootstrap';

import './style.css';
import { FaUserCircle } from 'react-icons/fa';



const Header = () => {
    const handleLogout = () => {
        // Xử lý logout tại đây
        console.log("Logging out...");
    };

    const handleProfile = () => {
        // Chuyển hướng hoặc xử lý khi nhấn tài khoản
        console.log("Redirect to profile...");
    };



    console.log('HomePage Rendered');
    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container fluid className="justify-content-end">
                <Dropdown>
                    <Dropdown.Toggle variant="light" className="d-flex align-items-center">
                        <FaUserCircle size={40} className="me-2 text-black" />
                        <div className="text-start">
                            <div className="fw-bold">Nguyễn Văn Vi</div>
                            <div className="text-muted small">[ROLE_MANAGER]</div>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Item href="#/profile">👤 Thông tin cá nhân</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/logout">🚪 Đăng xuất</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
    );
}
export default memo(Header);