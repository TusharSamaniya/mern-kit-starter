import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import adminReducer from './admin/adminSlice'
import supportReducer from './support/supportSlice'



export const store = configureStore({
    reducer: {
        auth: authReducer,

        // add admin reducer to store
        admin: adminReducer,


        support: supportReducer,




    },
})