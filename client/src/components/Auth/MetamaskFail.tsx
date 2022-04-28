import { Alert } from '@mui/material';
import React from 'react';

function MetamaskFail() {
  return (
    <Alert severity="error">
      Couldn&apos;t authenticate identity.
    </Alert>
  );
}

export default MetamaskFail;
