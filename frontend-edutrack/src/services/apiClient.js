import axios from 'axios';

const API_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Token expirado o no autorizado. Redirigiendo a login...');
    }
    return Promise.reject(error);
  }
);

export default apiClient;