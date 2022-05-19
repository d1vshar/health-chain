import React from 'react';
import {
  Button,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { CheckIcon, XIcon } from '@heroicons/react/solid';
import recordPermissions from '../assets/mockData/recordPermissions';

export default function PatientPermissionsPage() {
  const { id } = useParams();
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Doctor Id</TableCell>
              <TableCell>Doctor Name</TableCell>
              <TableCell>Read Permission</TableCell>
              <TableCell>Write Permission</TableCell>
              <TableCell>Manage Permission</TableCell>
              <TableCell>Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recordPermissions.map((row) => id === row.id && (
            <TableRow key={row.id}>
              <TableCell>{row.doctorId}</TableCell>
              <TableCell>{row.doctorName}</TableCell>
              <TableCell>
                {row.read ? (
                  <CheckIcon
                    height="24px"
                    width="24px"
                  />
                ) : (
                  <XIcon
                    height="24px"
                    width="24px"
                  />
                )}

              </TableCell>
              <TableCell>
                {row.write ? (
                  <CheckIcon
                    height="24px"
                    width="24px"
                  />
                ) : (
                  <XIcon
                    height="24px"
                    width="24px"
                  />
                )}

              </TableCell>
              <TableCell>
                {row.manage ? (
                  <CheckIcon
                    height="24px"
                    width="24px"
                  />
                ) : (
                  <XIcon
                    height="24px"
                    width="24px"
                  />
                )}

              </TableCell>
              <TableCell><Button>Delete</Button></TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
