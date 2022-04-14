import React from 'react';
import { Typography } from '@mui/material';

interface ProfileRoleProps {
  userRole: string,
}

function ProfileRole({ userRole }: ProfileRoleProps) {
  return (
    <Typography
      sx={{
        color: 'grey',
        marginX: '16px',
        fontSize: '10px',
        fontWeight: '400',
      }}
    >
      {userRole}
    </Typography>
  );
}

export default ProfileRole;
