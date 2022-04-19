import React, { useState } from 'react';
import {
  Button, Paper, TableContainer,
} from '@mui/material';
import { PlusIcon } from '@heroicons/react/solid';
import chance from 'chance';
import { useRecoilState } from 'recoil';
import PageHeader from '../components/Page/PageHeader';
import PageTitle from '../components/Page/PageTitle';
import type { DoctorData } from '../types';
import DoctorsTable from '../components/Doctors/DoctorsTable';
import PageContent from '../components/Page/PageContent';
import doctorsListStateFamily from '../store/doctorListStateFamily';

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
  const [page, setPage] = useState<number>(1);
  const [doctorsListState] = useRecoilState(doctorsListStateFamily({ limit: 100, page }));

  const onPrevPage = () => {
    setPage(page - 1);
  };

  const onNextPage = () => {
    setPage(page + 1);
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
          doctors={doctorsListState.list || []}
          pagination={doctorsListState._pagination || null}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
        />
      </TableContainer>
    </PageContent>
  );
}

export default DoctorsPage;
