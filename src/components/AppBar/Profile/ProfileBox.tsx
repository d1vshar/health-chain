import {
  Box, Tooltip,
} from '@mui/material';
import React from 'react';
import ProfileName from './ProfileName';
import ProfilePic from './ProfilePic';
import ProfileRole from './ProfileRole';

interface ProfileBoxProps {
  name: string,
  // role: string
  address: string
  pic: string,
}

function ProfileBox({
  name, address, pic,
}: ProfileBoxProps) {
  return (
    <Tooltip
      title={address}
    >
      <Box
        display="flex"
        flexDirection="row"
        maxWidth="512px"
        bgcolor="white"
        alignItems="center"
        sx={{
          cursor: 'context-menu',
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
            userRole="Admin"
          />
        </Box>
      </Box>
    </Tooltip>
  );
}

export default ProfileBox;
