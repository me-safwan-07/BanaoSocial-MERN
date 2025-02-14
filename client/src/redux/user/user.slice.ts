import { toast } from "@/hooks/use-toast";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signIn = createAsyncThunk(
    "user/signIn",
    async (data: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URI}/auth/signin`,
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
    async (
        data: { name: string; email: string; password: string; confirmPassword: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.status === 400) {
                toast({
                    variant: "destructive",
                    message: "Error ⚠️",
                    description: result.message || "Email already exists",
                });
                return rejectWithValue(result);
            }

            if (!response.ok) {
                return rejectWithValue(result);
            }

            return result;
        } catch (error) {
            return rejectWithValue({ message: "Something went wrong. Please try again." });
        }
    }
);
export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (data: { email: string, newPassword: string}, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URI}/auth/reset-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            console.log(response);
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