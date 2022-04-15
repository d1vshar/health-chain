import { Typography } from '@mui/material';
import React from 'react';

interface PageTitleProps {
  children: React.ReactNode | React.ReactNode[]
}

function PageTitle({ children }: PageTitleProps) {
  return (
    <Typography
      fontWeight="bold"
      variant="h1"
      fontSize="24px"
      marginRight="32px"
    >
      {children}
    </Typography>
  );
}

export default PageTitle;
