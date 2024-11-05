import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:2304/api/', // Replace with your API base URL
    timeout: 10000, // Optional: set a timeout for the requests
});

// Request interceptor to add the Authorization header
api.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem('userDetails'); // Get token from localStorage
        const token = JSON.parse(userDetails || "null")?.token
        if (token) {
            config.headers['Authorization'] = `${token}`; // Add token to headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
