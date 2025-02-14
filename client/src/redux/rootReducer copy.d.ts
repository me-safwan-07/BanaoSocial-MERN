import { combineReducers } from "@reduxjs/toolkit";

import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import userSlice from "./user/user.slice";
import themeSlice from "./theme/theme.slice";
import postSlice from "./post/post.slice";
import { AnyAction, CombinedState, Reducer } from "@reduxjs/toolkit";
import { RootState } from "./store"; // Assuming you have a RootState type defined in your store file

const appReducer = combineReducers({
    user: userSlice,
    theme: themeSlice,
    post: postSlice,
});

interface RootState {
    user: ReturnType<typeof userSlice>;
    theme: ReturnType<typeof themeSlice>;
    post: ReturnType<typeof postSlice>;
}

const rootReducer: Reducer<CombinedState<RootState>, AnyAction> = (state: CombinedState<RootState> | undefined, action: AnyAction): CombinedState<RootState> => {
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
