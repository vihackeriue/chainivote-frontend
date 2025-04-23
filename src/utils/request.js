import axios from 'axios';
import { CgOptions } from 'react-icons/cg';

const request = axios.create({
    baseURL: 'http://localhost:8080/',
});

const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
}

export default request;