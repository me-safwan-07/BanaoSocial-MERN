import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const createPost = createAsyncThunk(
    "post/createPost",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/post/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.token}`,
                        credentials: "include",
                    },
                    body: JSON.stringify(data.formData),
                }
            );
            if (!response.ok) {
                return rejectWithValue(await response.json());
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const updatePost = createAsyncThunk(
    "post/updatePost",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/post/${data.postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
                body: JSON.stringify(data.formData),
            });
            if (!response.ok) {
                return rejectWithValue(await response.json());
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
)

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/post/${data.postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${data.jwtToken}`,
                },
            });
            if (!response.ok) {
                return rejectWithValue(await response.json());
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);


export const fetchPosts = createAsyncThunk(
    "post/fetchPosts",
    async (token, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/post/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                return rejectWithValue(await response.json());
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const createComment = createAsyncThunk(
    "post/createComment",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/post/comment/${data.postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.jwtToken}`,
                },
                body: JSON.stringify({ content: data.content }),
            });
            if (!response.ok) {
                return rejectWithValue(await response.json());
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

export const createInteraction = createAsyncThunk(
    "post/createInteraction",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/post/interaction/${data.postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.jwtToken}`,
                },
                body: JSON.stringify({ type: data.type }),
            });
            if (!response.ok) {
                return rejectWithValue(await response.json());
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);    


const initialState = {
    myPosts: [],
    otherPosts: [],
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        createLocalComment: (state, action) => {
            console.log(action.payload);
            const { postId, content, owner } = action.payload;
            const post = state.myPosts.find((post) => post._id === postId);
            if (post) {
                post.comments.push({
                    content,
                    owner,
                });
            } else {
                const post2 = state.otherPosts.find((post) => post._id === postId);
                if (post2) {
                    post2.comments.push({
                        content,
                        owner
                    });
                }
            }
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.myPosts.push(action.payload.data.post);
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.myPosts = action.payload.data.myPosts;
            state.otherPosts = action.payload.data.otherPosts;
        });
        builder.addCase(updatePost.fulfilled, (state, action) => {
            const postIndex = state.myPosts.findIndex((post) => post._id === action.payload.data.post._id);
            if (postIndex !== -1) {
                state.myPosts[postIndex] = action.payload.data.post;
            }
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.myPosts = state.myPosts.filter((post) => post._id !== action.payload.data.post._id);
        });
    },
});

export const { createLocalComment } = postSlice.actions;
export default postSlice.reducer;

