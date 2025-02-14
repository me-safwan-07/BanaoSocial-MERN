import { combineReducers } from "@reduxjs/toolkit";

import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import userSlice from "./user/user.slice";
import themeSlice from "./theme/theme.slice";
import postSlice from "./post/post.slice";
import { AnyAction, Reducer } from "@reduxjs/toolkit";
// Removed import for RootState as it is not exported from "./store"

const appReducer = combineReducers({
    user: userSlice,
    theme: themeSlice,
    post: postSlice,
});

export interface RootState {
    user: ReturnType<typeof userSlice>;
    theme: ReturnType<typeof themeSlice>;
    post: ReturnType<typeof postSlice>;
}

const rootReducer: Reducer<ReturnType<typeof appReducer>, AnyAction> = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction): ReturnType<typeof appReducer> => {
    if (action.type === "LOGOUT") {
        state = undefined; // Reset the state to initial state
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
