import React from 'react';
import {
  Paper, Table, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
// import { PatientRecords } from '../../types';

export default function PatientRecordsTable() {
  // const [records, setRecords] = React.useState<PatientRecords[]>([]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Temperature</TableCell>
              <TableCell>Heart Rate</TableCell>
              <TableCell>Respiratory Status</TableCell>
              <TableCell>O2 Status</TableCell>
              <TableCell>SBP</TableCell>
              <TableCell>DBP</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Permission</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Paper>
  );
}
