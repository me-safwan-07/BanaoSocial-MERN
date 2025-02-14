import { createSelector } from "@reduxjs/toolkit";

interface RootState {
    user: UserState;
}

interface UserState {
    userInfo: UserInfo;
    jwtToken: string;
}

interface UserInfo {
    // Define the properties of userInfo here
}

const selectUser = (state: RootState): UserState => state.user;

export const selectUserInfo = createSelector(selectUser, (user) => user.userInfo);
export const selectUserToken = createSelector(selectUser, (user) => user.jwtToken);