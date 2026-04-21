import axios from 'axios';
import { adminLogoutAPI, refreshTokenAPI } from './adminApi';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: '',  // Set base URL here or use an environment variable
    withCredentials: true,  // Ensures cookies are sent with requests
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        // You can add token or custom headers here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check for 403 status and if the request has not been retried yet
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token
                const refreshResponse = await refreshTokenAPI(); // Assumes the response sets the refreshed token in cookies

                // Retry the original request with refreshed token if needed
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                await adminLogoutAPI(); // Handle logout if refresh fails
                return Promise.reject(refreshError);  // Reject with the refresh error
            }
        }

        // For any other error, or if retry fails, reject the original error
        return Promise.reject(error);
    }
);

export default axiosInstance;
