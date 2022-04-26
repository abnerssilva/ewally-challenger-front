import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/boleto/'
});

export default api;
