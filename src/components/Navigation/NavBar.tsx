import React from 'react';
import {
  Avatar, Box, Link, Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { NavRoute } from '../../App';

type NavBarProps = {
  routes: NavRoute[]
};

function NavBar({ routes }: NavBarProps) {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      paddingY="16px"
      justifyContent="space-between"
      alignItems="center"
      marginY="16px"
    >
      <Box
        width="156px"
        display="flex"
        flexDirection="row"
      >
        {routes.map((route) => (
          <Link
            component={RouterLink}
            to={route.href}
            href={route.href}
            marginRight="32px"
            underline="always"
            sx={{
              fontSize: '14px',
              textDecorationThickness: '2px',
              textUnderlineOffset: '8px',
            }}
          >
            {route.label}
          </Link>
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        maxWidth="512px"
        bgcolor="white"
        alignItems="center"
      >
        <Avatar
          alt="Divyanshu Sharma"
          src="https://avatars.githubusercontent.com/u/32746859?v=4"
          sx={{
            borderRadius: '0px',
          }}
        />
        <Typography
          padding="8px 16px"
          sx={{
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          Divyanshu (1c8aff...)
        </Typography>
      </Box>
    </Box>
  );
}

export default NavBar;
