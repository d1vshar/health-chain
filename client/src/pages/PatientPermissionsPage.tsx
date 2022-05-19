import React from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  FormGroup,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { useRecoilValue } from 'recoil';
import recordPermissions from '../assets/mockData/recordPermissions';
import authAtom from '../store/authState';
import { createRecordPermission } from '../api/RecordEndpoint';

export default function PatientPermissionsPage() {
  const authState = useRecoilValue(authAtom);
  const { id } = useParams();

  const [doctorId, setDoctorId] = React.useState('');
  const [read, setRead] = React.useState(false);
  const [write, setWrite] = React.useState(false);
  const [modify, setModify] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createPermissionHandler = () => {
    if (id !== undefined && authState !== null) {
      const patientId = authState.id;
      createRecordPermission(authState, {
        recordId: id,
        patientId,
        doctorId,
        read,
        write,
        manage: modify,
      });
    }
  };

  return (
    <>
      <Button onClick={handleOpen} sx={{ float: 'right', width: '10%' }}>Add Permission</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <TextField
          required
          id="outlined-required"
          label="Enter Doctor ID"
          defaultValue={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        />
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={read} onChange={(e) => setRead(e.target.checked)} />} label="Read" />
          <FormControlLabel control={<Checkbox checked={write} onChange={(e) => setWrite(e.target.checked)} />} label="Write" />
          <FormControlLabel control={<Checkbox checked={modify} onChange={(e) => setModify(e.target.checked)} />} label="Modify" />
          <Button onClick={() => createPermissionHandler()}>
            Submit
          </Button>
        </FormGroup>
      </Dialog>
      <br />
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
    </>
  );
}
