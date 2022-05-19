import React, { useEffect, useState } from 'react';
import {
  // Button,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { useRecoilValue } from 'recoil';
import { getRecordPermissions } from '../api/RecordEndpoint';
import authAtom from '../store/authState';
import { RecordPermissionData } from '../types';

export default function PatientPermissionsPage() {
  const { id } = useParams();
  const authState = useRecoilValue(authAtom);
  const [permissions, setPermissions] = useState<RecordPermissionData[]>([]);

  useEffect(() => {
    console.log('send request');
    const fetchData = async () => {
      console.log(authState, id);
      if (authState !== null && id !== undefined) {
        console.log('hello', id);
        const apiResponse = await getRecordPermissions(authState, id);

        console.log(apiResponse);

        setPermissions(apiResponse?.data?.permissions || []);
      }
    };

    fetchData();
  }, [authState, id]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Doctor Id</TableCell>
              <TableCell>Read Permission</TableCell>
              <TableCell>Write Permission</TableCell>
              <TableCell>Manage Permission</TableCell>
              {/* <TableCell>Change</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((p: RecordPermissionData) => (
              <TableRow key={p.id}>
                <TableCell>{p.doctorId}</TableCell>
                <TableCell>
                  {p.read ? (
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
                  {p.write ? (
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
                  {p.manage ? (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
