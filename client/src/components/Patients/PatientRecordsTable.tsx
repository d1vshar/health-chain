import React from 'react';
import {
  Button,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip,
} from '@mui/material';
// import { PatientRecords } from '../../types';

import { useNavigate } from 'react-router-dom';
import { ShieldCheckIcon } from '@heroicons/react/solid';
import { VitalRecord } from '../../api';

interface PatientRecordsTableProps {
  data: VitalRecord[]
}

export default function PatientRecordsTable({ data }: PatientRecordsTableProps) {
  const navigate = useNavigate();

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>RECORD ID</TableCell>
              <TableCell>TEMPERATURE</TableCell>
              <TableCell>HEART RATE</TableCell>
              <TableCell>RESP RATE</TableCell>
              <TableCell>O2</TableCell>
              <TableCell>BP</TableCell>
              <TableCell>DOCTOR ID</TableCell>
              <TableCell>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((record: VitalRecord) => (
              <TableRow key={record.id}>
                <TableCell>
                  <Tooltip title="HASH VERIFIED">
                    <ShieldCheckIcon height="24px" />
                  </Tooltip>
                </TableCell>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.temperature}</TableCell>
                <TableCell>{record.heartRate}</TableCell>
                <TableCell>{record.respRate}</TableCell>
                <TableCell>{record.o2sat}</TableCell>
                <TableCell>{`${record.sbp} / ${record.dpb}`}</TableCell>
                <TableCell>{record.addedBy}</TableCell>
                <TableCell><Button onClick={() => navigate(`/app/record/${record.id}/permissions`)}>Manage Permissions</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
