import React from 'react';
import {
  Table, TableHead, TableRow, TableBody, TableCell, Tooltip,
} from '@mui/material';
import { FingerPrintIcon } from '@heroicons/react/solid';
import { Patient } from '../../api';

interface PatientsTableProps {
  patients: Patient[]
}

function PatientsTable({ patients }: PatientsTableProps) {
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
            Date of Birth
          </TableCell>
          <TableCell>
            Date of Death
          </TableCell>
          <TableCell>
            Gender
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {patients.map((patient) => (
          <TableRow
            key={patient.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell>
              <Tooltip title={patient.id ? patient.id : 'NA'}>
                <FingerPrintIcon
                  height="24px"
                  width="24px"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              {patient.id}
              {/* <TruncateTooltip text={patient.id} limit={10} /> */}
            </TableCell>
            <TableCell>
              {patient.name}
            </TableCell>
            <TableCell>
              {new Date(patient.dob).toUTCString()}
            </TableCell>
            <TableCell>
              {patient.dod ? new Date(patient.dod).toUTCString() : ''}
            </TableCell>
            <TableCell>
              {patient.gender}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PatientsTable;
