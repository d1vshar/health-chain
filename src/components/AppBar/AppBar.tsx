import React from 'react';
import { Box } from '@mui/material';

type AppBarProps = {
  children: React.ReactNode | React.ReactNode[]
};

function AppBar({ children }: AppBarProps) {
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
      {children}
    </Box>
  );
}

export default AppBar;
