import * as api from '../../api/authAPI';
import {
    requestStart,
    loginSuccess,
    loginFail,
    signupSuccess,
    signupFail,
    getUserSuccess,
    getUserFail,
    logoutFail,
    logoutSuccess,
    forgotPasswordRequestSuccess,
    forgotPasswordRequestFail,
    forgotPasswordSuccess,
    forgotPasswordFail,
    verifyUserSuccess,
    verifyUserFail,
    updateProfileSuccess,
    updateProfileFail,
    changePasswordSuccess,
    changePasswordFail,
    otpVerificationStart,
    updateSettingsSuccess,
    updateSettingsFail,
    updateEmailSuccess,
    updateEmailFail,
    updatePhoneSuccess,
    updatePhoneFail,
    accountDeleteSuccess,
    accountDeleteFail,

} from './authSlice';

// create a signin service for login the user
export const signin = (formData, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.signinAPI(formData);
        console.log('response in services', response.step)
        if (response.step === 'LOGIN_COMPLETE') {
            navigate('/dashboard');
            showAlert(response.message)
            dispatch(loginSuccess());
        }
        else if (response.step === 'OTP_PENDING') {
            navigate('/otpLogin');
            showAlert(response.message)
            dispatch(otpVerificationStart());
        }
        else {
            showAlert(response.message)
            dispatch(loginFail())
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(loginFail())
    }

};


// create a verifyOtp service for login the user
export const otpLogin = (formData, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.verifyOtpAPI(formData);
        if (response.step === 'LOGIN_COMPLETE') {
            navigate('/dashboard');
            showAlert(response.message)
            dispatch(loginSuccess());
        }
        else {
            showAlert(response.message)
            dispatch(loginFail())
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(loginFail())
    }

};

// create a signup service for signup the user
export const signup = (formData, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.signupAPI(formData);
        if (response.success) {
            navigate('/login')
            showAlert(response.message)
            dispatch(signupSuccess());
        }
        else {
            showAlert(response.message)
            dispatch(signupFail())
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(signupFail())
    }

};

// create a getUser service for get user information from the user
export const getUser = (navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.getUserDetailsAPI();
        if (response.success) {
            dispatch(getUserSuccess(response.data));
        }
        else {
            navigate('/login')
            showAlert(response.message)
            dispatch(getUserFail())
        }

    } catch (error) {
        navigate('/login')
        showAlert(error.message)
        dispatch(getUserFail())
    }
};

// create a logout service for logout the user
export const logout = (navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart());
    try {
        const response = await api.logoutAPI();
        if (response.success) {
            dispatch(logoutSuccess());  // First, handle the success state
            showAlert(response.message);  // Show the alert message
            navigate('/login');  // Then, redirect to the home page
        } else {
            showAlert(response.message);
            dispatch(logoutFail());
        }
    } catch (error) {
        showAlert(error.message);
        dispatch(logoutFail());
    }
};

// create a forgotpasswordRequest service for request the reset password link on user's the mail
export const forgotPasswordRequest = (formData, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart());
    try {
        const response = await api.forgotPasswordRequestAPI(formData);
        if (response.success) {
            dispatch(forgotPasswordRequestSuccess());
            showAlert(response.message);
            navigate('/login');
        } else {
            showAlert(response.message);
            dispatch(forgotPasswordRequestFail());
        }
    } catch (error) {
        showAlert(error.message);
        dispatch(forgotPasswordRequestFail());
    }
};

// create a forgotPassword service for reseting the user password
export const forgotPassword = (formData, token, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart());
    try {
        const response = await api.forgotPasswordAPI(formData, token);
        if (response.success) {
            dispatch(forgotPasswordSuccess());
            showAlert(response.message);
            navigate('/login');
        } else {
            showAlert(response.message);
            dispatch(forgotPasswordFail());
        }
    } catch (error) {
        showAlert(error.message);
        dispatch(forgotPasswordFail());
    }
};

// create a verifyUser service for verifying the user
export const verifyUser = (token, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart());
    try {
        const response = await api.verifyUserAPI(token);
        if (response.success) {
            dispatch(verifyUserSuccess());
            showAlert(response.message);
            navigate('/login');
        } else {
            showAlert(response.message);
            dispatch(verifyUserFail());
        }
    } catch (error) {
        showAlert(error.message);
        dispatch(verifyUserFail());
    }
};


// create a updateUser service for update details in db
export const updateProfile = (formData, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.updateProfileAPI(formData);
        if (response.success) {
            navigate('/profile')
            showAlert(response.message)
            dispatch(updateProfileSuccess(response.data));
        }
        else {
            showAlert(response.message)
            dispatch(updateProfileFail(response))
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(updateProfileFail(response))
    }

};


// create a updateUser service for update details in db
export const updateSettings = (formData, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.updateSettingsAPI(formData);
        if (response.success) {
            navigate('/settings')
            showAlert(response.message)
            dispatch(updateSettingsSuccess(response));
        }
        else {
            showAlert(response.message)
            dispatch(updateSettingsFail(response))
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(updateSettingsFail(response))
    }

};



// create a updateEmail service for update details in db
export const changeemail = (formData, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.changeEmailAPI(formData);
        if (response.success) {

            showAlert(response.message)
            dispatch(updateEmailSuccess());
        }
        else {
            showAlert(response.message)
            dispatch(updateEmailFail())
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(updateEmailFail())
    }

};

export const changePassword = (formData, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.changePasswordAPI(formData);
        if (response.success) {
            navigate('/dashboard')
            showAlert(response.message)
            dispatch(changePasswordSuccess());
        }
        else {
            showAlert(response.message)
            dispatch(changePasswordFail())
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(changePasswordFail())
    }

};

export const changePhone = (formData, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.changePhoneAPI(formData);
        if (response.success) {
            showAlert(response.message)
            dispatch(updatePhoneSuccess());
        }
        else {
            showAlert(response.message)
            dispatch(updatePhoneFail())
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(updatePhoneFail())
    }

};
export const deleteAccount = (formData, navigate, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.deleteUserAPI(formData);
        if (response.success) {
            navigate('/')
            showAlert(response.message)
            dispatch(accountDeleteSuccess());
        }
        else {
            showAlert(response.message)
            dispatch(accountDeleteFail())
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(accountDeleteFail())
    }

};