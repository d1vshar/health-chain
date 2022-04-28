import { Button } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';
import { getNonceForAddress, verifyAndLogin } from '../../api/AuthEndpoint';
import MetamaskAPI from '../../api/MetamaskAPI';
import authAtom from '../../store/authState';

interface MetamaskButtonProps {
  active: boolean,
  onClick: () => void
}

function MetamaskButton({ active, onClick }: MetamaskButtonProps) {
  const [, setAuth] = useRecoilState(authAtom);

  const onButtonClick = async () => {
    onClick();
    const mmAPI = new MetamaskAPI();
    const address = await mmAPI.signer.getAddress();

    console.log('NONCE');
    const nonce = await getNonceForAddress(address);

    if (nonce?.data) {
      console.log('SIGNATURE');
      const signature = await mmAPI.signIn(nonce?.data.auth.nonce.toString());

      if (signature) {
        console.log('VERIFY');
        const response = await verifyAndLogin(address, signature);

        if (response && response.data) {
          if (response.data.auth.verificationResult) {
            setAuth({
              id: response.data.auth.id!,
              token: response.data.auth.token!,
            });
          }
        }
      }
    }
  };

  return (
    <Button
      fullWidth={false}
      sx={{
        minWidth: '200px',
        marginTop: '32px',
      }}
      onClick={onButtonClick}
      disabled={active}
    >
      {!active ? 'CONNECT TO METAMASK' : 'CONNECTING'}
    </Button>
  );
}

export default MetamaskButton;
