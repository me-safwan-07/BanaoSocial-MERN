import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signIn = createAsyncThunk(
    "user/signIn",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URI}/api/auth/signin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (!response.ok) {
                return rejectWithValue(await response.json());
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return error;
        }
    }
);

export const signUp = createAsyncThunk(
    "user/signUp",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/auth/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (!response.ok) {
                return rejectWithValue(await response.json());
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return error;
        }
    }
);

export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URI}/api/auth/reset-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            if (!response.ok) {
                return rejectWithValue(await response.json());
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return error;
        }
    }
);

const initialState = {
    userInfo: {
        _id: "",
        email: "",
        name: "",
    },
    jwtToken: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setJwtToken: (state, action) => {
            state.jwtToken = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            console.log(action.payload);
            state.userInfo = action.payload.data.user;
            state.jwtToken = action.payload.data.token;
        });    
    },
});

export const { setUserInfo, setJwtToken } = userSlice.actions;

export default userSlice.reducer;
