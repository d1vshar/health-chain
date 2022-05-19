import React from 'react';
import { Stack } from '@mui/material';

interface PageCOntentProps {
  children: React.ReactNode | React.ReactNode[]
}

function PageContent({ children }: PageCOntentProps) {
  return (
    <Stack
      marginY="32px"
      spacing={6}

    >
      {children}
    </Stack>
  );
}

export default PageContent;
