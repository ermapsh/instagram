import { configureStore } from '@reduxjs/toolkit';
import mobileReducer from './features/signup/mobileSlice';
import otpReducer from './features/signup/otpSlice';
import signupReducer from './features/signup/signupSlice';
import usernameReducer from './features/usernameSlice';

export const store = configureStore({
    reducer: {
        mobile: mobileReducer,
        otp: otpReducer,
        signup: signupReducer,
        username: usernameReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch