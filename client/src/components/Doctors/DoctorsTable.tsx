import React from 'react';
import {
  Table, TableHead, TableRow, TableBody, TableCell, Button, Tooltip,
} from '@mui/material';
import { FingerPrintIcon } from '@heroicons/react/solid';
import { DoctorData } from '../../types';

interface DoctorsTableProps {
  doctors: DoctorData[]
  onShowClick: (uuid: string) => void
}

function DoctorsTable({ doctors, onShowClick }: DoctorsTableProps) {
  return (
    <Table aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>
            Name
          </TableCell>
          <TableCell>
            Speciality
          </TableCell>
          <TableCell>
            Last Activity
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {doctors.map((doctor) => (
          <TableRow
            key={doctor.address}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell>
              <Tooltip title={doctor.address}>
                <FingerPrintIcon
                  height="24x"
                  width="24px"
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              {doctor.name}
            </TableCell>
            <TableCell>
              {doctor.speciality}
            </TableCell>
            <TableCell>
              {doctor.lastActivity.toISOString()}
            </TableCell>
            <TableCell>
              <Button
                onClick={() => onShowClick(doctor.uuid)}
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

export default DoctorsTable;
