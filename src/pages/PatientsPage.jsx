import React from 'react';
import {
  Box,
  Button, Card, CardActions, CardContent, Typography,
} from '@mui/material';
import { LockOpenIcon } from '@heroicons/react/solid';

function PatientsPage() {
  return (
    <Box>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            be
            -
            nev
            -
            o
            -
            lent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            a benevolent smile
          </Typography>
        </CardContent>
        <CardActions>
          <Button startIcon={<LockOpenIcon height="16px" width="16px" />}>Open</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default PatientsPage;
