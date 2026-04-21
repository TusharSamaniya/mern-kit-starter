import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    isAuthenticated: false,
    allUsers: null,
    error: null,
    user: null,
    admin: null,
    message: null, // message returned from server with every request
    allMessages: [], // messages sent by user to the developer
    allTickets: [],
    ticket: null,
    messageById: null
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        requestStart: (state) => {
            state.loading = true;
        },
        getAllUserByAdminSuccess: (state, action) => {
            state.loading = false;
            state.allUsers = action.payload.data;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        getAllUserByAdminFail: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        getUserByIdSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        getUserByIdFail: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        createNotificationSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        createNotificationFail: (state, action) => {
            state.loading = false;
            // state.error = action.payload.error;
        },
        adminLoginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        adminLoginFail: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        adminLogoutSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        adminLogoutFail: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        createAdminSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        createAdminFail: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        getAdminSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.admin = action.payload.data;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        getAdminFail: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        adminUpdateUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        adminUpdateUserFail: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        adminDeleteUserSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        adminDeleteUserFail: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        adminGetAllMessagesSuccess: (state, action) => {
            state.loading = false;
            state.allMessages = action.payload.data;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        adminGetAllMessagesFail: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        adminGetMessageByIdSuccess: (state, action) => {
            state.loading = false;
            state.messageById = action.payload.data;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        adminGetMessageByIdFail: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        adminReplyMessageByIdSuccess: (state, action) => {
            state.loading = false;
            state.messageById = action.payload.data;
            state.message = action.payload.message;
            state.error = action.payload.error;
        },
        adminReplyMessageByIdFail: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.error = action.payload.error;
        }
    }
});

export const {
    requestStart,
    getAllUserByAdminSuccess,
    getAllUserByAdminFail,
    getUserByIdSuccess,
    getUserByIdFail,
    createNotificationSuccess,
    createNotificationFail,
    adminLoginSuccess,
    adminLoginFail,
    adminLogoutSuccess,
    adminLogoutFail,
    createAdminSuccess,
    createAdminFail,
    getAdminSuccess,
    getAdminFail,
    adminUpdateUserSuccess,
    adminUpdateUserFail,
    adminDeleteUserSuccess,
    adminDeleteUserFail,
    adminGetAllMessagesSuccess,
    adminGetAllMessagesFail,
    adminGetMessageByIdSuccess,
    adminGetMessageByIdFail,
    adminReplyMessageSuccess,
    adminReplyMessageFail
} = adminSlice.actions;

export default adminSlice.reducer;
