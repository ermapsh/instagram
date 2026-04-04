import api from "@/api"
import { ApiResponse } from "@/interface/response"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"


interface payloadType {
    username: string

}

interface CounterState {
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    message: string,
    data: any,
    username: string,
    usernameError: boolean
}

const initialState: CounterState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: null,
    username: '',
    usernameError: false
}

export const usernameExist = createAsyncThunk<
    ApiResponse, // Return Type
    payloadType,      // Argument Type (mobile)
    { rejectValue: ApiResponse } // ThunkAPI config
>(
    "signup/usernameExist",
    async (payload: payloadType, thunkAPI) => {
        try {
            const response = await api.post<ApiResponse>("/signup/username-available", payload)
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

export const usernameSlice = createSlice({
    name: "username",
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setUsernameError: (state, action: PayloadAction<boolean>) => {
            state.usernameError = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // Loading
            .addCase(usernameExist.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })

            // Success
            .addCase(usernameExist.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload?.data
            })

            // Error
            .addCase(usernameExist.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload?.message || "Something went wrong"
            })
    }
})

export const { setUsername, setUsernameError } = usernameSlice.actions
export default usernameSlice.reducer
