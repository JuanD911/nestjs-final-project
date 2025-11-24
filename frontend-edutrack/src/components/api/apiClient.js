import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; 

const apiClient = axios.create({
  baseURL: BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

export default apiClient;