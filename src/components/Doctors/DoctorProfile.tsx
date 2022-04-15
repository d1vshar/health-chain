import React from 'react';
import {
  Avatar, Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from '@mui/material';

// interface DoctorProfileProps {
// }

function DoctorProfile() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="32px"
      width="50%"
      alignItems="center"
      justifyContent="center"
    >
      <Avatar
        src="https://clinicalnotebook.com/wp-content/uploads/2015/04/Doctor-Profile-Pic-Example.png"
        variant="rounded"
        sx={{
          height: '196px',
          width: '196px',
        }}
      />
      <Grid
        container
        spacing="32px"
        width="100%"
        marginTop="48px"
        textAlign="center"
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
        <Grid
          item
          xs={12}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '10px',
                textTransform: 'uppercase',
              }}
            >
              Registrations
            </Typography>
            <Typography
              variant="h6"
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      Registration Number
                    </TableCell>
                    <TableCell align="center">
                      Year
                    </TableCell>
                    <TableCell align="center">
                      Registrar
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      231321321312
                    </TableCell>
                    <TableCell align="center">
                      2001
                    </TableCell>
                    <TableCell align="center">
                      Indian Medical Association
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      432424243243
                    </TableCell>
                    <TableCell align="center">
                      2008
                    </TableCell>
                    <TableCell align="center">
                      London Medical Association
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DoctorProfile;
