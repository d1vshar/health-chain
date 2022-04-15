import React from 'react';
import { Box } from '@mui/material';

interface PageCOntentProps {
  children: React.ReactNode | React.ReactNode[]
}

function PageContent({ children }: PageCOntentProps) {
  return (
    <Box
      marginY="32px"
    >
      {children}
    </Box>
  );
}

export default PageContent;
