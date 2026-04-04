import api from "@/api"
import { ApiResponse } from "@/interface/response"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"


interface SignupState {
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    message: string,
    data: any,

    // signup payload
    password: string,
    passwordError: boolean,
    dob: string,
    dobError: boolean,
    username: string,
    usernameError: boolean,
    fullName: string,
    fullNameError: boolean

}

const initialState: SignupState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: null,

    password: "",
    passwordError: false,
    dob: "",
    dobError: false,
    username: "",
    usernameError: false,
    fullName: "",
    fullNameError: false
}

export const signupVerify = createAsyncThunk<
    ApiResponse,
    any, // Using any payload here to match API schema { sessionId, ... }
    { rejectValue: ApiResponse }
>(
    "signup/verify",
    async (payload: any, thunkAPI) => {
        try {
            const response = await api.post<ApiResponse>("/signup/complete", payload)
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

export const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        setDob: (state, action: PayloadAction<string>) => {
            state.dob = action.payload
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setFullName: (state, action: PayloadAction<string>) => {
            state.fullName = action.payload
        },
        setPasswordError: (state, action: PayloadAction<boolean>) => {
            state.passwordError = action.payload
        },
        setDobError: (state, action: PayloadAction<boolean>) => {
            state.dobError = action.payload
        },
        setUsernameError: (state, action: PayloadAction<boolean>) => {
            state.usernameError = action.payload
        },
        setFullNameError: (state, action: PayloadAction<boolean>) => {
            state.fullNameError = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // Loading
            .addCase(signupVerify.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })

            // Success
            .addCase(signupVerify.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload?.data
            })

            // Error
            .addCase(signupVerify.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload?.message || "Something went wrong"
            })
    }
})

export const { setPassword, setDob, setUsername, setFullName, setPasswordError, setDobError, setUsernameError, setFullNameError } = signupSlice.actions
export default signupSlice.reducer
