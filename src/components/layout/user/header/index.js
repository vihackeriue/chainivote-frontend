import { memo } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button, Dropdown } from 'react-bootstrap';
import { ChevronDown } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import './style.css';



const Header = () => {

    console.log('HomePage Rendered');
    return (
        <Navbar bg="white" expand="xl" sticky="top" className="shadow-sm py-3">
            <Container fluid="xl">
                <Navbar.Brand href="/" className="d-flex align-items-center">
                    <h1 className="m-0 text-success fw-bold text-uppercase">Voting App</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navmenu" />
                <Navbar.Collapse id="navmenu" className="justify-content-between">
                    <Nav className="mx-auto gap-4">
                        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link text-success fw-semibold" : "nav-link text-dark"}>Trang chủ</NavLink>
                        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link text-success fw-semibold" : "nav-link text-dark"}>Cuộc bình chọn</NavLink>
                        <NavLink to="/courses" className={({ isActive }) => isActive ? "nav-link text-success fw-semibold" : "nav-link text-dark"}>Lịch sử</NavLink>
                        <NavLink to="/trainers" className={({ isActive }) => isActive ? "nav-link text-success fw-semibold" : "nav-link text-dark"}>Nhóm</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link text-success fw-semibold" : "nav-link text-dark"}>Liên hệ</NavLink>
                    </Nav>

                    <Dropdown align="end">
                        <Dropdown.Toggle variant="success" className="rounded-pill px-4">
                            Nguyễn Vĩ
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to="/profile">Thông tin cá nhân</Dropdown.Item>
                            <Dropdown.Divider />
                            {/* <Dropdown.Item onClick={logout}>Đăng xuất</Dropdown.Item> */}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button as={NavLink} to="/courses" className="rounded-pill px-4 bg-success border-0 text-white">
                        Login
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default memo(Header);