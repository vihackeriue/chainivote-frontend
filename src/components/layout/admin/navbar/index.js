import { memo } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './style.css';
import { FaVoteYea } from 'react-icons/fa';



const Menu = () => {
    console.log('HomePage Rendered');
    return (
        <div className="bg-dark text-white vh-100" style={{ width: '250px' }}>

            <div className="p-3 d-flex align-items-center ">
                <FaVoteYea size={28} className="me-2" />
                <strong>Quản lý bình chọn</strong>
            </div>
            <Nav className="flex-column p-2">
                <Nav.Link as={NavLink} to="/manager/home" eventKey="/manager/home" className="custom-nav-link">Trang chủ</Nav.Link>
                <div className="text-uppercase text-secondary mt-3 px-2 small">Hệ thống</div>
                <Nav.Link as={NavLink} to="/manager/add-poll" eventKey="/add-poll" className="custom-nav-link">Tạo Bình chọn</Nav.Link>
                <Nav.Link as={NavLink} to="/" eventKey="/" className="custom-nav-link">Nguyên liệu</Nav.Link>
                <Nav.Link as={NavLink} to="/nhap-hang" eventKey="/nhap-hang" className="text-white">Nhập hàng</Nav.Link>
                <Nav.Link as={NavLink} to="/san-pham" eventKey="/san-pham" className="text-white">Sản phẩm</Nav.Link>
                <Nav.Link as={NavLink} to="/danh-muc" eventKey="/danh-muc" className="text-white">Danh mục</Nav.Link>
                <Nav.Link as={NavLink} to="/khach-hang" eventKey="/khach-hang" className="text-white">Khách hàng</Nav.Link>
                <Nav.Link as={NavLink} to="/giam-gia" eventKey="/giam-gia" className="text-white">Mã giảm giá</Nav.Link>
            </Nav>
        </div>
    );
}
export default memo(Menu);