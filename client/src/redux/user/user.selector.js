import { createSelector } from "@reduxjs/toolkit";

const selectUser = (state) => state.user;

export const selectUserInfo = createSelector(selectUser, (user) => user.userInfo);
export const selectUserToken = createSelector(selectUser, (user) => user.jwtToken);