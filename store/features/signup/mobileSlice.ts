import api from "@/api"
import { ApiResponse } from "@/interface/response"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


interface dataState {
    sessionId: string,
    otp: string
}

interface CounterState {
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    message: string,
    data: dataState | any
}

const initialState: CounterState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: null
}

export const mobileApi = createAsyncThunk<
    ApiResponse, // Return Type
    string,      // Argument Type (mobile)
    { rejectValue: ApiResponse } // ThunkAPI config
>(
    "mobile/sendMobile",
    async (mobile: string, thunkAPI) => {
        try {
            const payload = { phoneNumber: mobile }
            const response = await api.post<ApiResponse>("/signup/getOtp", payload)
            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data || {
                    code: 500,
                    message: "Unknown error",
                    data: null,
                    error: "Unknown error"
                }
            )
        }
    }
)

export const mobileSlice = createSlice({
    name: "mobile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Loading
            .addCase(mobileApi.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })

            // Success
            .addCase(mobileApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
            })

            // Error
            .addCase(mobileApi.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload?.message || "Something went wrong"
            })
    }
})

// export const { } = mobileSlice.actions
export default mobileSlice.reducer
