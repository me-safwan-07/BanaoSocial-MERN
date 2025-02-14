import { createSelector } from "@reduxjs/toolkit";

interface RootState {
    user: UserState;
}

interface UserState {
    userInfo: UserInfo;
    jwtToken: string;
}

interface UserInfo {
    _id: string;
    name: string;
    email: string;
    password: string;
    posts: string[];
    tags: string[];
    __v: number;
    jwtToken: string;
}

const selectUser = (state: RootState): UserState => state.user;

export const selectUserInfo = createSelector(selectUser, (user) => user.userInfo);
export const selectUserToken = createSelector(selectUser, (user) => user.jwtToken);