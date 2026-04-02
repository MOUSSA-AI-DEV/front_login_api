import axios from 'axios';

console.log('axios.js: Initializing axios client');

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Laravel standard API URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

console.log('axios.js: Adding interceptors');

// Add an interceptor to include the auth token in requests if it exists
api.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (e) {
        console.error('axios.js: Error accessing localStorage:', e);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
