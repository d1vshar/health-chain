import React from 'react';
import { Typography } from '@mui/material';

interface ProfileNameProps {
  name: string,
}

function ProfileName({ name }: ProfileNameProps) {
  return (
    <Typography
      sx={{
        marginX: '16px',
        fontSize: '14px',
        fontWeight: '600',
      }}
    >
      {name}
    </Typography>
  );
}

export default ProfileName;
