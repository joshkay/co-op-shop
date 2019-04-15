import axios from 'axios';
import { getToken, isTokenExpired } from '../auth';
import { userUnauthenticated } from '../store/users/actions';
import { store } from '../store';

const http = axios.create({
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token)
    {
      if (isTokenExpired(token))
      {
        store.dispatch(userUnauthenticated());
      }
      else
      {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;