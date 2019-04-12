import axios from 'axios';
import { getToken } from '../auth';

const http = axios.create({
  timeout: 1000,
  headers: {'Content-Type': 'application/json'},
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token)
    {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;