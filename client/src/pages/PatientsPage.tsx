import React, { useState } from 'react';
import {
  Button, CircularProgress, Paper, TableContainer,
} from '@mui/material';
import { PlusIcon } from '@heroicons/react/solid';
import { useRecoilState } from 'recoil';
import PageHeader from '../components/Page/PageHeader';
import PageTitle from '../components/Page/PageTitle';
import PageContent from '../components/Page/PageContent';
import PatientsTable from '../components/Patients/PatientsTable';
import patientListStateFamily from '../store/patientListStateFamily';

function PatientsPage() {
  const [page, setPage] = useState<number>(1);
  const [patientListState] = useRecoilState(patientListStateFamily({ limit: 100, page }));

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
          Patients
        </PageTitle>
        <Button
          startIcon={<PlusIcon height="16px" width="16px" />}
          fullWidth={false}
        >
          Register New Patient
        </Button>
      </PageHeader>
      {patientListState.list !== undefined ? (
        <TableContainer
          component={Paper}
        >
          <PatientsTable
            patients={patientListState.list || []}
            pagination={patientListState._pagination || null}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
          />
        </TableContainer>
      ) : <CircularProgress />}
    </PageContent>
  );
}

export default PatientsPage;
