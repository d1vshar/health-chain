import React from 'react';
import {
  Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from '@mui/material';

function PatientProfile() {
  return (
    <Box
      display="flex"
      width="100%"
      alignItems="center"
    >

      <Grid
        container
        spacing="16px"
        width="50%"
        // marginTop="24px"
      >
        <Grid
          item
          xs={6}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '10px',
                textTransform: 'uppercase',
              }}
            >
              Name
            </Typography>
            <Typography
              variant="h6"
            >
              Dr. Divyanshu Sharma
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '10px',
                textTransform: 'uppercase',
              }}
            >
              Qualifications
            </Typography>
            <Typography
              variant="h6"
            >
              MBBS, MD
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '10px',
                textTransform: 'uppercase',
              }}
            >
              Department
            </Typography>
            <Typography
              variant="h6"
            >
              OPD
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '10px',
                textTransform: 'uppercase',
              }}
            >
              Specialities
            </Typography>
            <Typography
              variant="h6"
            >
              Family Medicine
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '10px',
                textTransform: 'uppercase',
              }}
            >
              Email
            </Typography>
            <Typography
              variant="h6"
            >
              me@example.com
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '10px',
                textTransform: 'uppercase',
              }}
            >
              Contact Number
            </Typography>
            <Typography
              variant="h6"
            >
              +91 92321 39281
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box
        width="50%"
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '10px',
            textTransform: 'uppercase',
          }}
        >
          Registrations
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Registration Number
              </TableCell>
              <TableCell>
                Year
              </TableCell>
              <TableCell>
                Registrar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                231321321312
              </TableCell>
              <TableCell>
                2001
              </TableCell>
              <TableCell>
                Indian Medical Association
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                432424243243
              </TableCell>
              <TableCell>
                2008
              </TableCell>
              <TableCell>
                London Medical Association
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default PatientProfile;
