import React from 'react';
import { Avatar, Box, Grid } from '@mui/material';

// interface DoctorProfileProps {
// }

function DoctorProfile() {
  return (
    <Box
      padding="32px"
    >
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={6}
          md={4}
        >
          <Avatar
            src="https://clinicalnotebook.com/wp-content/uploads/2015/04/Doctor-Profile-Pic-Example.png"
            variant="square"
            sx={{
              height: '128px',
              width: '128px',
            }}
          />
        </Grid>
        <Grid
          item
          xs={6}
          md={8}
        >
          Lorem
        </Grid>
      </Grid>
    </Box>
  );
}

export default DoctorProfile;
