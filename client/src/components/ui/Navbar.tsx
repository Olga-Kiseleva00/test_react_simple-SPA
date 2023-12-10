import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as NavLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUserThunk } from '../../redux/slices/user/userThunks';
import { linkStyle } from '../styles';

export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);

  const links =
    user.status === 'logged'
      ? [
          { to: '/', name: 'Главная' },
          { to: '/browse', name: 'Browse' },
        ]
      : [
          { to: '/', name: 'Главная' },
          { to: '/signup', name: 'Зарегистрироваться' },
          { to: '/login', name: 'Войти' },
        ];

  return (
    <Box sx={{ flexGrow: 1, typography: 'body1', backgroundColor: '#008080' }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#008080', width: '100%' }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Привет, {user.status === 'logged' ? user.username : 'дорогой гость'}
          </Typography>
          {links.map((link) => (
            <Link component={NavLink} key={link.name} to={link.to} sx={linkStyle}>
              {link.name}
            </Link>
          ))}
          {user.status === 'logged' && (
            <Button
              color="inherit"
              onClick={() => {
                void dispatch(logoutUserThunk());
              }}
            >
              Выйти
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
