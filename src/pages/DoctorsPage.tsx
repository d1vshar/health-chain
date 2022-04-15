import React from 'react';
import {
  Button, Paper, TableContainer,
} from '@mui/material';
import { PlusIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/Page/PageHeader';
import PageTitle from '../components/Page/PageTitle';
import type { DoctorData } from '../types';
import DoctorsTable from '../components/Doctors/DoctorsTable';

function createData(
  address: string,
  uuid: string,
  name: string,
  speciality: string,
): DoctorData {
  const lastActivity = new Date();
  return {
    address, uuid, name, speciality, lastActivity,
  };
}

const rows: DoctorData[] = [
  createData('23132131321312323123', '23135324', 'Divyanshu Sharma', 'General Physician'),
  createData('23132131321312323232', '5435435435', 'Somil Gupta', 'Orthopedic'),
];

function DoctorsPage() {
  const navigate = useNavigate();

  const onShowClick = (uuid: string) => {
    navigate(`/doctor/${uuid}`);
  };

  return (
    <>
      <PageHeader>
        <PageTitle>
          Doctors
        </PageTitle>
        <Button
          startIcon={<PlusIcon height="16px" width="16px" />}
          fullWidth={false}
        >
          Register New Doctor
        </Button>
      </PageHeader>
      <TableContainer
        component={Paper}
      >
        <DoctorsTable
          doctors={rows}
          onShowClick={onShowClick}
        />
      </TableContainer>
    </>
  );
}

export default DoctorsPage;
