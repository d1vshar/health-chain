import React from 'react';
import {
  Button,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
// import { PatientRecords } from '../../types';

import { useNavigate } from 'react-router-dom';
import patientRecordData from '../../assets/mockData/patientRecord';

export default function PatientRecordsTable() {
  // const [records, setRecords] = React.useState<PatientRecords[]>([]);

  const navigate = useNavigate();

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
          <TableBody>
            {patientRecordData.map((record:any) => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.temperature}</TableCell>
                <TableCell>{record.heart_rate}</TableCell>
                <TableCell>{record.resp_rate}</TableCell>
                <TableCell>{record.o2sat}</TableCell>
                <TableCell>{record.sbp}</TableCell>
                <TableCell>{record.dbp}</TableCell>
                <TableCell>{record.doctor}</TableCell>
                <TableCell><Button onClick={() => navigate(`/app/record/${record.id}/permissions`)}>Modify</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
