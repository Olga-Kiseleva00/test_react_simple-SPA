import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import BrowsePage from './components/pages/BrowsePage';
import MainPage from './components/pages/MainPage';
import AuthPage from './components/pages/AuthPage';
import Navbar from './components/ui/Navbar';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserThunk } from './redux/slices/user/userThunks';
import PrivateRouter from './components/hocs/PrivateRouter';

function App(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(checkUserThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
    <Container>
      <Routes>
        <Route path="/" element={<MainPage />} />
  
        <Route
          path="/browse"
          element={
            <PrivateRouter
              isAllowed={user.status === 'logged'}
              redirect='/login'
            >
              <BrowsePage />
            </PrivateRouter>
          }
        />
         <Route
          path="/:auth"
          element={
            <PrivateRouter isAllowed={user.status === 'guest'}
            >
              <AuthPage />
            </PrivateRouter>
          }
        />
      </Routes>
    </Container>
    </>
  );
}

export default App;
