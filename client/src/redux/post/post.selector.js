import { createSelector } from "@reduxjs/toolkit";

const selectPost = (state) => state.post;

export const selectMyPosts = createSelector([selectPost], (post) => post.myPosts);
export const selectOtherPosts = createSelector([selectPost], (post) => post.otherPosts);