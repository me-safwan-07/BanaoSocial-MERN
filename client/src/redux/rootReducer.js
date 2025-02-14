import { combineReducers } from "@reduxjs/toolkit";

import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import userSlice from "./user/user.slice";
import themeSlice from "./theme/theme.slice";
import postSlice from "./post/post.slice";

const appReducer = combineReducers({
    user: userSlice,
    theme: themeSlice,
    post: postSlice,
});

const rootReducer = (state, action) => {
    if (action.type === "LOGOUT") {
        state = {}; // Reset the state to initial state
    }
    return appReducer(state, action);
};

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "theme"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
