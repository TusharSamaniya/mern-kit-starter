import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    data: null,
    message: null,

}

export const supportSlice = createSlice({
    name: "support",
    initialState,
    reducers: {
        requestStart: (state) => {
            state.loading = true;
        },
        createMessageSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;

        },
        createMessageFail: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            
        }


    }

})

export const {
    requestStart,
    createMessageSuccess,
    createMessageFail,
} = supportSlice.actions;

export default supportSlice.reducer;