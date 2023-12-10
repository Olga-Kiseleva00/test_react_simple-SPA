import { createSlice } from '@reduxjs/toolkit';
import type { PostType } from '../../../types/postTypes';
import { addPostThunk, getPostsThunk } from './postsThunks';

const initialState: PostType[] = [];

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostsThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(addPostThunk.fulfilled, (state, {payload}) => [payload, ...state]);
  },
});

export default postsSlice.reducer;
