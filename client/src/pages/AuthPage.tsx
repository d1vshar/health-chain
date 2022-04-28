import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import MetamaskButton from '../components/Auth/MetamaskButton';
import MetamaskFail from '../components/Auth/MetamaskFail';
import MetamaskLoading from '../components/Auth/MetamaskLoading';
import authAtom from '../store/authState';

function AuthPage() {
  const [loading, setLoading] = useState(false);
  const authState = useRecoilValue(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState !== null) navigate('/app');
  }, [authState, navigate]);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        fontWeight="bold"
        variant="h1"
        fontSize="32px"
        marginBottom="64px"
        sx={{
          userSelect: 'none',
        }}
      >
        health-chain
      </Typography>
      <ErrorBoundary
        FallbackComponent={MetamaskFail}
      >
        <>
          {loading ? (
            <MetamaskLoading />
          ) : (
            <img
              src="/imgs/metamask.png"
              alt="Metamask Logo"
              height="72px"
              width="72px"
            />
          )}
          <MetamaskButton
            active={loading}
            onClick={() => setLoading(true)}
          />
        </>
      </ErrorBoundary>
    </Box>
  );
}

export default AuthPage;
