import axios from 'axios';
import { apiError, apiResponse } from './utils';
import apiClient from './axios';


export const signinAPI = async (formData) => {

    try {
        // creating a post request
        const response = await axios.post('/api/auth/login', formData);
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const verifyOtpAPI = async (formData) => {

    try {
        // creating a post request
        const response = await axios.post('/api/auth/otpLogin', formData, { withCredentials: true });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const signupAPI = async (formData) => {

    try {
        // creating a post request
        const response = await axios.post('/api/auth/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const accountVerifyAPI = async (formData) => {

    try {
        // creating a post request
        const response = await axios.post('/api/auth/signup', formData);
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const getUserDetailsAPI = async () => {
    try {
        // creating a post request
        const response = await apiClient.post('/api/auth/getUser', {}, { withCredentials: true });
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
        const response = await axios.post('/api/auth/refreshToken', {}, { withCredentials: true });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const logoutAPI = async (id) => {

    try {
        // creating a post request
        const response = await apiClient.post('/api/auth/logout', { id }, { withCredentials: true })
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const forgotPasswordRequestAPI = async (email) => {

    try {
        // creating a post request
        const response = await axios.post('/api/auth/forgotPassword', { email })
        // Process the response using apiResponse
        console.log('response in api is ', response)
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        console.log('error in api is ', error)

        return apiError(error);
    }
};

export const forgotPasswordAPI = async (newPassword, token) => {

    try {
        // creating a post request
        const response = await axios.post(`/api/auth/forgotPassword/${token}`, { newPassword })
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const verifyUserAPI = async (token) => {

    try {
        // creating a post request
        const response = await axios.post(`/api/auth/verify/${token}`)
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const updateProfileAPI = async (formData) => {

    try {
        // creating a post request
        const response = await apiClient.patch('/api/auth/updateProfile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const updateSettingsAPI = async (formData) => {

    try {
        // creating a post request
        const response = await apiClient.patch('/api/auth/updateSettings', formData, { withCredentials: true });
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const changePasswordAPI = async (formData) => {

    try {
        // creating a post request
        const response = await apiClient.patch(`/api/auth/changePassword`, formData, { withCredentials: true })
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const deleteUserAPI = async (formData) => {
    try {
        // creating a post request
        const response = await apiClient.post(`/api/auth/delete`, formData, { withCredentials: true })
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const changeEmailAPI = async (formData) => {

    try {
        // creating a post request
        const response = await apiClient.patch(`/api/auth/changeEmail`, formData, { withCredentials: true })
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};

export const changePhoneAPI = async (formData) => {

    try {
        // creating a post request
        const response = await apiClient.patch(`/api/auth/changePhone`, formData, { withCredentials: true })
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
};