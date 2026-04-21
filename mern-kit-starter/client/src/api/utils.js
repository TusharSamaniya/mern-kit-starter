
export const apiResponse = (response) => {
    // Check if the response has data and a status code
    if (response && response.status === 200) {
        return {
            success: true,
            data: response.data,
            message: response.data.message || "Request successful",
            step: response.data.step
        };
    };
    // Handle unexpected successful response cases
    return {
        success: false,
        data: null,
        message: "Unexpected response format"
    };
};


export const apiError = (error) => {
    // Check if it's an Axios error
    if (error.response) {
        // The request was made, and the server responded with a status code
        return {
            success: false,
            status: error.response.status,
            message: error.response.data.message || "Server error occurred",
            data: error.response.data || null
        };
    } else if (error.request) {
        // The request was made, but no response was received
        return {
            success: false,
            status: null,
            message: "No response from server. Please check your network connection.",
            data: null
        };
    } else {
        // Something happened in setting up the request
        return {
            success: false,
            status: null,
            message: `Request setup error: ${error.message}`,
            data: null
        };
    }
};
