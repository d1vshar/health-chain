import React from 'react';
import {
  Button, Paper, TableContainer,
} from '@mui/material';
import { PlusIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import chance from 'chance';
import PageHeader from '../components/Page/PageHeader';
import PageTitle from '../components/Page/PageTitle';
import type { DoctorData } from '../types';
import DoctorsTable from '../components/Doctors/DoctorsTable';
import PageContent from '../components/Page/PageContent';

const generateMockData = (amount: number): DoctorData[] => {
  const data: DoctorData[] = [];
  for (let i = 0; i < amount; i += 1) {
    data.push({
      address: chance().guid(),
      uuid: chance().guid(),
      name: chance().name(),
      speciality: chance().word(),
      lastActivity: chance().date(),
    });
  }

  return data;
};

const rows: DoctorData[] = generateMockData(100);

function DoctorsPage() {
  const navigate = useNavigate();

  const onShowClick = (uuid: string) => {
    navigate(`/doctor/${uuid}`);
  };

  return (
    <PageContent>
      <PageHeader>
        <PageTitle>
          Doctors -
          {' '}
          {rows.length}
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
    </PageContent>
  );
}

export default DoctorsPage;
