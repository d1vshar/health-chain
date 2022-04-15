import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import chance from 'chance';
import PageContent from '../components/Page/PageContent';
import PageHeader from '../components/Page/PageHeader';
import PageTitle from '../components/Page/PageTitle';
import type { PatientsData } from '../types';
import PatientProfile from '../components/Patients/PatientProfile';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const profile: PatientsData = {
  address: chance().guid(),
  uuid: chance().guid(),
  name: chance().name(),
  age: chance().age(),
  gender: chance().gender(),
  lastActivity: chance().date(),
};

function PatientProfilePage() {
  const params = useParams();
  return (
    <PageContent>
      <PageHeader>
        <PageTitle>
          Patient Profile -
          {' '}
          {params.id}
        </PageTitle>
      </PageHeader>
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
      >
        <PatientProfile />
      </Box>
    </PageContent>
  );
}

export default PatientProfilePage;
