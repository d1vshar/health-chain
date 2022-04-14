import React from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import TruncateTooltip from '../components/common/Truncate';

interface AuditEvent {
  eventAddress: string,
  timestamp: Date,
  eventType: string,
  status: string,
  address: string,
  accountAddress: string,
  ip: string,
}

function createData(
  eventAddress: string,
  timestamp: Date,
  eventType: string,
  status: string,
  address: string,
  accountAddress: string,
  ip: string,
): AuditEvent {
  return {
    eventAddress, timestamp, eventType, status, address, accountAddress, ip,
  };
}

const rows: AuditEvent[] = [
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'FAIL',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'DATA_ACCESS',
    'SUCCESS',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'SUCCESS',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'FAIL',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'DATA_ACCESS',
    'SUCCESS',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'SUCCESS',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'FAIL',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'DATA_ACCESS',
    'SUCCESS',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'SUCCESS',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'FAIL',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'DATA_ACCESS',
    'SUCCESS',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'SUCCESS',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'FAIL',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'DATA_ACCESS',
    'SUCCESS',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
  createData(
    'f2208c967df089f60420785795c0a9ba8896b0f6f1867fa7f1f12ad6f79c1a18',
    new Date(),
    'LOGIN',
    'SUCCESS',
    '06b3dfaec148fb1bb2b066f10ec285e7c9bf402ab32aa78a5d38e34566810cd2',
    '1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8',
    '219.231.321.321',
  ),
];

function AuditPage() {
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
        Global Audit Log
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Event Address</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>User Address</TableCell>
              <TableCell>Contract Address</TableCell>
              <TableCell>IP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.eventAddress}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <TruncateTooltip
                    text={row.eventAddress}
                    limit={12}
                  />
                </TableCell>
                <TableCell>{row.timestamp.toISOString()}</TableCell>
                <TableCell>{row.eventType}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <TruncateTooltip
                    text={row.accountAddress}
                    limit={12}
                  />
                </TableCell>
                <TableCell>
                  <TruncateTooltip
                    text={row.address}
                    limit={12}
                  />
                </TableCell>
                <TableCell>{row.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AuditPage;
