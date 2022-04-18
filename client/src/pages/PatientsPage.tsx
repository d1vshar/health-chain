import React from 'react';
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
  const [patientListState] = useRecoilState(patientListStateFamily({ limit: 100, page: 5 }));

  return (
    <PageContent>
      <PageHeader>
        <PageTitle>
          Patients
          {patientListState._pagination && (
            <>
              {' - '}
              Showing
              {' '}
              {(patientListState._pagination.page - 1) * patientListState._pagination.page_limit
              + 1}
              {' - '}
              {(patientListState._pagination.page - 1) * patientListState._pagination.page_limit
              + patientListState._pagination.page_limit}
              {' '}
              of
              {' '}
              {patientListState._pagination?.count || 0}
            </>
          )}
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
          />
        </TableContainer>
      ) : <CircularProgress />}
    </PageContent>
  );
}

export default PatientsPage;
