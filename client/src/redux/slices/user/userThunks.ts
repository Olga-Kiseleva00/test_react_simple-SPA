import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import type {
  UserLoginFormType,
  UserModelType,
  UserSignUpFormType,
} from '../../../types/userTypes';

export const checkUserThunk = createAsyncThunk<UserModelType>('user/checkUser', async () => {
  const navigate = useNavigate();
  try {
    const { data } = await axios<UserModelType>('/user/check');
    return data;
  } catch (error) {
    navigate('/login');
    throw error;
  }
});


export const signUpUserThunk = createAsyncThunk<UserModelType, UserSignUpFormType>(
  'user/signup',
  async (formData) => {
    const { data } = await axios.post<UserModelType>('/user/signup', formData);
    return data;
  },
);

export const loginUserThunk = createAsyncThunk<UserModelType, UserLoginFormType>(
  'user/login',
  async (formData) => {
    const { data } = await axios.post<UserModelType>('/user/login', formData);
    return data;
  },
);

export const logoutUserThunk = createAsyncThunk('user/logout', async () => axios('/user/logout'));
