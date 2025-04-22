import React from 'react';
import { Navigate } from 'react-router-dom';

const getUserRole = () => {
    // bỏ qua token
    const IS_TEST_MODE = true; // ✅ bật test mode để test nhanh

    if (IS_TEST_MODE) {
        return "ROLE_USER"; // hoặc "ROLE_USER" để test vai trò khác
    }

    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.roles?.[0];
    } catch (err) {
        return null;
    }
};

const PrivateRoute = ({ children, requiredRole }) => {
    const role = getUserRole();

    if (!role) return <Navigate to="/login" />;
    if (requiredRole && role !== requiredRole) return <Navigate to="/unauthorized" />;

    return children;
};

export default PrivateRoute;
