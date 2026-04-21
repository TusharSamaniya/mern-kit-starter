import * as api from '../../api/adminApi';
import {
    adminDeleteUserFail,
    adminDeleteUserSuccess,
    adminLoginFail,
    adminLoginSuccess,
    adminLogoutFail, adminLogoutSuccess,
    adminUpdateUserFail,
    adminUpdateUserSuccess,
    createAdminFail,
    createAdminSuccess,
    getAdminFail,
    getAdminSuccess,
    getAllUserByAdminFail,
    getAllUserByAdminSuccess,
    getUserByIdFail,
    getUserByIdSuccess,
    requestStart,
    adminGetAllMessagesSuccess,
    adminGetAllMessagesFail,
    adminGetMessageByIdSuccess,
    adminGetMessageByIdFail,
    adminReplyMessageSuccess,
    adminReplyMessageFail,
    createNotificationSuccess,
    createNotificationFail,
} from './adminSlice';


export const getAllUserByAdmin = (showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.getAllUserByAdminAPI();
        if (response.success) {
            // showAlert(response.message)
            dispatch(getAllUserByAdminSuccess(response.data));
        }
        else {
            showAlert(response.message)
            dispatch(getAllUserByAdminFail(response))
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(getAllUserByAdminFail(response))
    }

};

// create a getUser service for get user information from the user
export const getAdmin = (navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.getAdminAPI();
        if (response.success) {
            dispatch(getAdminSuccess(response.data));
        }
        else {
            navigate('/adminLogin')
            showAlert(response.message)
            dispatch(getAdminFail(response))
        }

    } catch (error) {
        navigate('/adminLogin')
        showAlert(error.message)
        dispatch(getAdminFail(response))
    }
};

export const adminLogin = (formData, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.adminLoginAPI(formData);
        if (response.success) {
            navigate('/adminDashboard')
            showAlert(response.message)
            dispatch(adminLoginSuccess(response.data));
        }
        else {
            showAlert(response.message)
            dispatch(adminLoginFail(response))
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(adminLoginFail(response))
    }

};

export const createAdmin = (formData, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.createAdminAPI(formData);
        if (response.success) {
            navigate('/adminDashboard')
            showAlert(response.message)
            dispatch(createAdminSuccess(response.data));
        }
        else {
            showAlert(response.message)
            dispatch(createAdminFail())
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(createAdminFail())
    }

};


export const getUserById = (formData, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.getAllUserByIdAPI(formData);
        if (response.success) {
            showAlert(response.message)
            dispatch(getUserByIdSuccess(response.data));
        }
        else {
            showAlert(response.message)
            dispatch(getUserByIdFail(response))
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(getUserByIdSuccess(response))
    }

};


export const adminUpdateUser = (formData, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.adminUpdateUserAPI(formData);
        if (response.success) {
            showAlert(response.message)
            dispatch(adminUpdateUserSuccess(response.data));
        }
        else {
            showAlert(response.message)
            dispatch(adminUpdateUserFail(response))
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(adminUpdateUserFail(response))
    }

};

export const adminLogout = (formData, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.adminLogoutAPI(formData);
        if (response.success) {
            navigate('/adminLogin')
            showAlert(response.message)
            dispatch(adminLogoutSuccess(response.data));
        }
        else {
            showAlert(response.message)
            dispatch(adminLogoutFail(response))
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(adminLogoutFail(response))
    }

};

export const adminDeleteUser = (formData, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.adminDeleteUserAPI(formData);
        if (response.success) {
            navigate('/getAllUsers')
            showAlert(response.message)
            dispatch(adminDeleteUserSuccess(response.data));
        }
        else {
            showAlert(response.message)
            dispatch(adminDeleteUserFail(response))
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(adminDeleteUserFail(response))
    }

};

export const getAllMessages = (navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.getAllMessagesAPI();
        if (response.success) {
            showAlert(response.message)
            dispatch(adminGetAllMessagesSuccess(response.data));
        }
        else {
            navigate('/adminDashboard')
            showAlert(response.message)
            dispatch(adminGetAllMessagesFail(response))
        }

    } catch (error) {
        navigate('/adminDashboard')
        showAlert(error.message)
        dispatch(adminGetAllMessagesFail(response))
    }

};

export const getMessageById = (id, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.getMessageByIdAPI(id);
        if (response.success) {

            showAlert(response.message)
            dispatch(adminGetMessageByIdSuccess(response.data));
        }
        else {
            navigate('/getAllMessages')
            showAlert(response.message)
            dispatch(adminGetMessageByIdFail(response))
        }

    } catch (error) {
        navigate('/getAllMessages')
        showAlert(error.message)
        dispatch(adminGetMessageByIdFail(response))
    }

};

export const replyMessage = (id, formData, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.replyMessageAPI(id, formData);
        if (response.success) {
            showAlert(response.message)
            dispatch(adminReplyMessageSuccess(response.data));
        }
        else {
            navigate('/getAllMessages')
            showAlert(response.message)
            dispatch(adminReplyMessageFail(response))
        }

    } catch (error) {
        navigate('/getAllMessages')
        showAlert(error.message)
        dispatch(adminReplyMessageFail(response))
    }

};
export const createNotificaiton = (formData, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.createNotificaitonAPI(formData);
        if (response.success) {
            showAlert(response.message)
            dispatch(createNotificationSuccess(response.data));
        }
        else {
            showAlert(response.message)
            dispatch(createNotificationFail(response))
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(createNotificationFail())
    }

}; 
