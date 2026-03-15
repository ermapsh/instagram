import { os } from '@/constant/os';
import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Create the instance
const api = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// --- Request Interceptor ---
api.interceptors.request.use(
    (config) => {
        const token = 'sdfssfs';

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['os'] = os;

        if (__DEV__) {
            console.log(`\n🚀 --------- API REQUEST --------- 🚀`);
            console.log(`--> METHOD: ${config.method?.toUpperCase()}`);
            console.log(`--> URL: ${config.baseURL || ''}${config.url}`);
            console.log(`--> HEADERS:`, JSON.stringify(config.headers, null, 2));
            if (config.data) {
                console.log(`--> BODY:`, JSON.stringify(config.data, null, 2));
            }
            console.log(`------------------------------------\n`);
        }
        return config;
    },
    (error) => {
        console.log(`\n❌ --------- API REQUEST ERROR --------- ❌`);
        console.log(`--> ERROR:`, error.message);
        console.log(`------------------------------------------\n`);
        return Promise.reject(error);
    }
);

// --- Response Interceptor ---
api.interceptors.response.use(
    (response) => {
        if (__DEV__) {
            console.log(`\n✅ --------- API RESPONSE --------- ✅`);
            console.log(`--> URL: ${response.config.url}`);
            console.log(`--> STATUS: ${response.status}`);
            console.log(`--> RESPONSE DATA:`, JSON.stringify(response.data, null, 2));
            console.log(`-------------------------------------\n`);
        }
        return response;
    },
    (error) => {
        if (__DEV__) {
            console.log(`\n❌ --------- API ERROR RESPONSE --------- ❌`);
            console.log(`--> URL: ${error.config?.url}`);
            console.log(`--> STATUS: ${error.response?.status}`);
            console.log(`--> ERROR DATA:`, error.response?.data ? JSON.stringify(error.response.data, null, 2) : error.message);
            console.log(`------------------------------------------\n`);
        }

        const originalRequest = error.config;

        // Handle Global Errors (e.g., Token Expired)
        if (error.response && error.response.status === 401 && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;

            console.error('Unauthorized! Redirecting to login...');
            // Optional: Clear storage and redirect to login page
            // localStorage.removeItem('userToken');
            // window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;