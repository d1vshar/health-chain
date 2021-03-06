import {
  Box, Tooltip,
} from '@mui/material';
import React from 'react';
import ProfileName from './ProfileName';
import ProfilePic from './ProfilePic';
import ProfileRole from './ProfileRole';

interface ProfileBoxProps {
  name: string,
  userRole: string
  address: string
  pic: string,
}

function ProfileBox({
  name, userRole, address, pic,
}: ProfileBoxProps) {
  return (
    <Tooltip
      title={address}
    >
      <Box
        display="flex"
        flexDirection="row"
        maxWidth="512px"
        alignItems="center"
        sx={{
          cursor: 'copy',
          userSelect: 'none',
        }}
      >
        <ProfilePic
          alt="Divyanshu Sharma"
          imageUrl={pic}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          padding="4px 16px 4px 2px"
        >
          <ProfileName
            name={name}
          />
          <ProfileRole
            userRole={userRole}
          />
        </Box>
      </Box>
    </Tooltip>
  );
}

export default ProfileBox;
