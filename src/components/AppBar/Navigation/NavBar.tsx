import React from 'react';
import { Box, Typography } from '@mui/material';
import type { NavRoute } from '../../../App';
import NavLink from './NavLink';

interface NavBarProps {
  routes: NavRoute[],
}

function NavBar({ routes }: NavBarProps) {
  return (
    <Box
      display="flex"
      flexDirection="row"
    >
      <Typography
        fontWeight="bold"
        variant="h1"
        fontSize="24px"
        marginRight="32px"
        sx={{
          userSelect: 'none',
        }}
      >
        health-chain
      </Typography>
      {routes.map((route) => (
        <NavLink route={route} />
      ))}
    </Box>
  );
}

export default NavBar;
