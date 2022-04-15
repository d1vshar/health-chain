import React from 'react';
import {
  Paper, TableContainer,
} from '@mui/material';
import PageHeader from '../components/Page/PageHeader';
import PageTitle from '../components/Page/PageTitle';
import type { AuditEvent } from '../types';
import AuditTable from '../components/Audit/AuditTable';

function createData(
  eventAddress: string,
  timestamp: Date,
  eventType: string,
  status: string,
  accountAddress: string,
  ip: string,
): AuditEvent {
  return {
    eventAddress, timestamp, eventType, status, accountAddress, ip,
  };
}

const rows: AuditEvent[] = [
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'FAIL',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'DATA_ACCESS',
    'SUCCESS',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'SUCCESS',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'FAIL',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'DATA_ACCESS',
    'SUCCESS',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'SUCCESS',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'FAIL',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'DATA_ACCESS',
    'SUCCESS',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'SUCCESS',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'FAIL',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'DATA_ACCESS',
    'SUCCESS',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'SUCCESS',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'FAIL',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'DATA_ACCESS',
    'SUCCESS',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'SUCCESS',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
];

function AuditPage() {
  return (
    <>
      <PageHeader>
        <PageTitle>
          Global Audit Log
        </PageTitle>
      </PageHeader>
      <TableContainer component={Paper}>
        <AuditTable events={rows} />
      </TableContainer>
    </>
  );
}

export default AuditPage;
