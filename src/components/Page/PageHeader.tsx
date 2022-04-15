import { Box } from '@mui/material';
import React from 'react';

interface PageHeaderProps {
  children: React.ReactNode | React.ReactNode[]
}

function PageHeader({ children }: PageHeaderProps) {
  return (
    <Box
      height="48px"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      marginBottom="16px"
    >
      {children}
    </Box>
  );
}

export default PageHeader;
