import React from 'react';
import {
  Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import TruncateTooltip from '../components/common/Truncate';
import ExpandableTableRow from '../components/common/ExpandableTable/ExpandableTableRow';
import ExpandableTableBody from '../components/common/ExpandableTable/ExpandableTableBody';
import DoctorProfile from '../components/Doctors/DoctorProfile';

interface DoctorData {
  address: string
  name: string,
}

function createData(
  address: string,
  name: string,
): DoctorData {
  return {
    address, name,
  };
}

const rows: DoctorData[] = [
  createData('23132131321312323123', 'Divyanshu Sharma'),
  createData('23132131321312323232', 'Somil Gupta'),
];

function DoctorsPage() {
  return (
    <Box
      marginY="32px"
    >
      <Typography
        fontWeight="bold"
        variant="h1"
        fontSize="24px"
        marginRight="32px"
        marginBottom="24px"
      >
        Doctors
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <ExpandableTableBody>
            {rows.map((row) => (
              <ExpandableTableRow
                key={row.address}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                expandedComponent={<DoctorProfile />}
              >
                <TableCell>
                  <TruncateTooltip
                    text={row.address}
                    limit={12}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
              </ExpandableTableRow>
            ))}
          </ExpandableTableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DoctorsPage;
