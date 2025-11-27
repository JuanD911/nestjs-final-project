import axios from 'axios';

const API_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("Token enviado en petición:", token.substring(0, 30) + "...");
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("Token expirado o no autorizado. Redirigiendo a login...");
        
        localStorage.removeItem("token");

        window.location.href = "/login";
      }

      if (error.response.status === 403) {
        console.log("Acceso denegado: solo admin.");
        alert("Acceso denegado: solo un administrador puede realizar esta acción.");
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
