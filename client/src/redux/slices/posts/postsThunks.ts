import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PostFormType, PostType } from '../../../types/postTypes';

export const getPostsThunk = createAsyncThunk<PostType[]>('posts/getPosts', async () => {
  const { data } = await axios<PostType[]>('/posts');
  return data;
});

export const addPostThunk = createAsyncThunk<PostType, PostFormType>(
  'posts/addPost',
  async (formData) => {
    const { data } = await axios.post<PostType>('/posts', formData);
    return data;
  },
);

export const deletePostThunk = createAsyncThunk<PostType['id'], PostType['id']>(
  'posts/deletePost',
  async (id) => {
    await axios.delete<PostType['id']>(`/posts/${id}`);
    return id;
  },
);
