import React from 'react';
import {
  Table, TableHead, TableRow, TableBody, TableCell, Button, Tooltip,
} from '@mui/material';
import { FingerPrintIcon } from '@heroicons/react/solid';
import { PatientsData } from '../../types';
import TruncateTooltip from '../common/TruncateTooltip';

interface PatientsTableProps {
  patients: PatientsData[]
  onShowClick: (uuid: string) => void
}

function PatientsTable({ patients, onShowClick }: PatientsTableProps) {
  return (
    <Table aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>
            UUID
          </TableCell>
          <TableCell>
            Name
          </TableCell>
          <TableCell>
            Age
          </TableCell>
          <TableCell>
            Gener
          </TableCell>
          <TableCell>
            Last Activity
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {patients.map((patient) => (
          <TableRow
            key={patient.address}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell>
              <Tooltip title={patient.address}>
                <FingerPrintIcon
                  height="24x"
                  width="24px"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <TruncateTooltip text={patient.uuid} limit={10} />
            </TableCell>
            <TableCell>
              {patient.name}
            </TableCell>
            <TableCell>
              {patient.age}
            </TableCell>
            <TableCell>
              {patient.gender}
            </TableCell>
            <TableCell>
              {patient.lastActivity.toISOString()}
            </TableCell>
            <TableCell>
              <Button
                onClick={() => onShowClick(patient.uuid)}
              >
                Show Details
              </Button>
            </TableCell>
            <TableCell>
              <Button
                color="error"
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PatientsTable;
