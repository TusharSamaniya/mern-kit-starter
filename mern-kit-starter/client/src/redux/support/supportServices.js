import * as api from '../../api/supportApi'
import { requestStart, createMessageFail, createMessageSuccess } from './supportSlice';

export const createMessage = (formData, showAlert) => async (dispatch) => {
    dispatch(requestStart())
    try {
        const response = await api.createMessageAPI(formData, showAlert);
        if (response.success) {
            showAlert(response.message)
            dispatch(createMessageSuccess(response.data));
        }
        else {
            showAlert(response.message)
            dispatch(createMessageFail(response))
        }

    } catch (error) {
        showAlert(error.message)
        dispatch(createMessageFail(response))
    }

};
