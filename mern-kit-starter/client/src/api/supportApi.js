import axios from 'axios';
import { apiError, apiResponse } from './utils';


export const createMessageAPI = async (formData) => {
    try {
        // creating a post request
        const response = await axios.post('/api/support/message', formData);
        // Process the response using apiResponse
        return apiResponse(response);
    } catch (error) {
        // Handle the error using apiError
        return apiError(error);
    }
}