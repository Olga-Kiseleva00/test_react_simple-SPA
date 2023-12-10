import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import type { UserLoginFormType, UserSignUpFormType } from '../../types/userTypes';
import { useAppDispatch } from '../../redux/hooks';
import { loginUserThunk, signUpUserThunk } from '../../redux/slices/user/userThunks';
import { authTextFieldStyle, buttonStyle } from '../styles';

export default function AuthPage(): JSX.Element {
  const { auth } = useParams();
  const dispatch = useAppDispatch();

  const submitHandler: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    auth === 'signup'
      ? void dispatch(signUpUserThunk(formData as UserSignUpFormType))
      : void dispatch(loginUserThunk(formData as UserLoginFormType));
  };

  return (
    <Grid container direction="row" >
      <Grid item xs={3} />
      <Grid item xs={6}>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
          py={5}
          onSubmit={submitHandler}
        >
          {auth === 'signup' && (
            <TextField
              variant="outlined"
              name="username"
              label="Имя"
              sx={authTextFieldStyle}
            />
          )}
          <TextField
            variant="outlined"
            name="email"
            label="Email"
            type="email"
            sx={authTextFieldStyle}
          />
          <TextField
            variant="outlined"
            name="password"
            label="Пароль"
            type="password"
            sx={authTextFieldStyle}
          />
          <Button variant="outlined" type="submit" sx={buttonStyle}>
            {auth === 'signup' ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
