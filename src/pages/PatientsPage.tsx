import React from 'react';
import {
  Button, Paper, TableContainer,
} from '@mui/material';
import { PlusIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import chance from 'chance';
import PageHeader from '../components/Page/PageHeader';
import PageTitle from '../components/Page/PageTitle';
import type { PatientsData } from '../types';
import PageContent from '../components/Page/PageContent';
import PatientsTable from '../components/Patients/PatientsTable';

const generateMockData = (amount: number): PatientsData[] => {
  const data: PatientsData[] = [];
  for (let i = 0; i < amount; i += 1) {
    data.push({
      address: chance().guid(),
      uuid: chance().guid(),
      name: chance().name(),
      age: chance().age(),
      gender: chance().gender(),
      lastActivity: chance().date(),
    });
  }

  return data;
};

const rows: PatientsData[] = generateMockData(100);

function PatientsPage() {
  const navigate = useNavigate();

  const onShowClick = (uuid: string) => {
    navigate(`/patient/${uuid}`);
  };

  return (
    <PageContent>
      <PageHeader>
        <PageTitle>
          Patients -
          {' '}
          {rows.length}
        </PageTitle>
        <Button
          startIcon={<PlusIcon height="16px" width="16px" />}
          fullWidth={false}
        >
          Register New Patient
        </Button>
      </PageHeader>
      <TableContainer
        component={Paper}
      >
        <PatientsTable
          patients={rows}
          onShowClick={onShowClick}
        />
      </TableContainer>
    </PageContent>
  );
}

export default PatientsPage;
