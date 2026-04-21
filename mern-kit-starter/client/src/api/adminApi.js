import axios from 'axios';
import { apiError, apiResponse } from './utils';
import apiClient from './axiosAdmin';


export const adminLoginAPI = async (formData) => {

    try {
        // creating a post request
        const response = await axios.post('/api/admin/adminLogin', formData);
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const refreshTokenAPI = async () => {

    try {
        // creating a post request
        const response = await axios.post('/api/admin/refreshToken', {}, { withCredentials: true });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError 
        return apiError(error);
    }
};

export const adminLogoutAPI = async (id) => {

    try {
        // creating a post request
        const response = await axios.post('/api/admin/logout', { id }, { withCredentials: true });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const getAdminAPI = async () => {

    try {
        // creating a post request
        const response = await apiClient.post('/api/admin/getAdmin', {}, { withCredentials: true });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const createAdminAPI = async (formData) => {

    try {
        // creating a post request
        const response = await axios.post('/api/admin/createAdmin', formData);
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const getAllUserByAdminAPI = async () => {

    try {
        // creating a post request
        const response = await apiClient.get('/api/admin/users', {}, { withCredentials: true });

        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const getAllUserByIdAPI = async (id) => {

    try {
        // creating a post request
        const response = await apiClient.get(`/api/admin/user/${id}`, {}, { withCredentials: true });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const adminUpdateUserAPI = async (formData) => {

    try {
        // creating a post request
        const response = await apiClient.patch(`/api/admin/user/${formData.id}`, formData, { withCredentials: true });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const adminDeleteUserAPI = async (id) => {

    try {
        // creating a post request
        const response = await apiClient.delete(`/api/admin/user/${id}`, {}, { withCredentials: true });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const getAllMessagesAPI = async () => {

    try {
        // creating a post request
        const response = await apiClient.get(`/api/admin/messages`, {}, { withCredentials: true });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const replyMessageAPI = async (id, formData) => {

    try {
        // creating a post request
        const response = await apiClient.patch(`/api/admin/message/${id}`, formData, { withCredentials: true });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const getMessageByIdAPI = async (id) => {

    try {
        // creating a post request
        const response = await apiClient.get(`/api/admin/message/${id}`, {}, { withCredentials: true });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const createNotificaitonAPI = async (formData) => {
    try {
        // creating a post request
        const response = await apiClient.post(`/api/admin/notification`, formData, { withCredentials: true });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
}