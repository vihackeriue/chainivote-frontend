import request from '../utils/request';


export const Login = async ({ username, password }) => {
    const response = await request.post('/auth/login', { username, password });
    return response.data; // chứa accessToken, fullname, role
};