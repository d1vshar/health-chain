import React from 'react';
import { Avatar } from '@mui/material';

interface ProfilePicProps {
  alt: string,
  imageUrl: string,
}

function ProfilePic({ alt, imageUrl }: ProfilePicProps) {
  return (
    <Avatar
      alt={alt}
      src={imageUrl}
      sx={{
        width: '48px',
        height: '48px',
        borderRadius: '0px',
      }}
    />
  );
}

export default ProfilePic;
