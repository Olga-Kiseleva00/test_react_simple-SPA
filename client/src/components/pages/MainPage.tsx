import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

export default function MainPage(): JSX.Element {
  return (
        <Box pt={4} display="flex" flexDirection="row" justifyContent="center">
          <Typography variant="h3" color="#2E3B55">
           Это главная страница...
          </Typography>
        </Box>
  );
}
