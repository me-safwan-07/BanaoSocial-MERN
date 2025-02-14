import { createSelector } from "@reduxjs/toolkit";

interface PostState {
    myPosts: any[];
    otherPosts: any[];
}

interface RootState {
    post: PostState;
}

const selectPost = (state: RootState): PostState => state.post;

export const selectMyPosts = createSelector([selectPost], (post) => post.myPosts);
export const selectOtherPosts = createSelector([selectPost], (post) => post.otherPosts);