import { createSlice } from '@reduxjs/toolkit';
import type { UserType } from '../../../types/userTypes';
import { checkUserThunk, loginUserThunk, logoutUserThunk, signUpUserThunk } from './userThunks';

type UserSliceType = UserType;

const initialState: UserSliceType = { status: 'loading' };

const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserSliceType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkUserThunk.fulfilled, (state, { payload }) => ({
      ...payload,
      status: 'logged',
    }));
    builder.addCase(checkUserThunk.pending, (state) => ({ status: 'loading' }));
    builder.addCase(checkUserThunk.rejected, (state) => ({ status: 'guest' }));

    builder.addCase(signUpUserThunk.fulfilled, (state, { payload }) => ({
      ...payload,
      status: 'logged',
    }));
    builder.addCase(signUpUserThunk.rejected, (state) => ({ status: 'guest' }));

    builder.addCase(loginUserThunk.fulfilled, (state, { payload }) => ({
      ...payload,
      status: 'logged',
    }));
    builder.addCase(loginUserThunk.rejected, (state) => ({ status: 'guest' }));

    builder.addCase(logoutUserThunk.fulfilled, (state) => ({ status: 'guest' }));
    builder.addCase(logoutUserThunk.rejected, (state) => state);
  },
});

export default userSlice.reducer;
