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
      variant="square"
      sx={{
        width: '48px',
        height: '48px',
      }}
    />
  );
}

export default ProfilePic;
