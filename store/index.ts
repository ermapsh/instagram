import { configureStore } from '@reduxjs/toolkit'
import mobileReducer from './features/signup/mobileSlice'
import otpReducer from './features/signup/otpSlice'

export const store = configureStore({
    reducer: {
        mobile: mobileReducer,
        otp: otpReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch