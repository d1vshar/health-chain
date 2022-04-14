import React from 'react';
import {
  Avatar, Box, Link, Typography,
} from '@mui/material';

function NavBar() {
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
        <Link
          href="/"
          marginRight="32px"
          underline="always"
          sx={{
            fontSize: '14px',
            textDecorationThickness: '2px',
            textUnderlineOffset: '8px',
          }}
        >
          Dashboard
        </Link>
        <Link
          href="/"
          marginRight="32px"
          underline="always"
          sx={{
            fontSize: '14px',
            textDecorationThickness: '2px',
            textUnderlineOffset: '8px',
          }}
        >
          Records
        </Link>
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
