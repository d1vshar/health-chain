import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import DoctorProfile from '../components/Doctors/DoctorProfile';
import PageHeader from '../components/Page/PageHeader';
import PageTitle from '../components/Page/PageTitle';
import type { DoctorData } from '../types';

function createData(
  address: string,
  name: string,
  speciality: string,
): DoctorData {
  const lastActivity = new Date();
  return {
    address, name, speciality, lastActivity,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const profile: DoctorData = createData(
  '23132131321312323123',
  'Divyanshu Sharma',
  'General Physician',
);

function DoctorProfilePage() {
  const params = useParams();
  return (
    <>
      <PageHeader>
        <PageTitle>
          Doctor Profile -
          {' '}
          {params.id}
        </PageTitle>
      </PageHeader>
      <Box>
        <DoctorProfile />
      </Box>
    </>
  );
}

export default DoctorProfilePage;
