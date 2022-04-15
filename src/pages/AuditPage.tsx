import React from 'react';
import {
  Paper, TableContainer,
} from '@mui/material';
import chance from 'chance';
import PageHeader from '../components/Page/PageHeader';
import PageTitle from '../components/Page/PageTitle';
import type { AuditEvent } from '../types';
import AuditTable from '../components/Audit/AuditTable';
import PageContent from '../components/Page/PageContent';

const generateMockData = (amount: number): AuditEvent[] => {
  const data: AuditEvent[] = [];
  for (let i = 0; i < amount; i += 1) {
    data.push({
      eventAddress: chance().guid(),
      timestamp: chance().date(),
      eventType: chance().pickone(['LOGIN', 'DATA_READ', 'DATA_WRITE']),
      status: chance().pickone(['FAIL', 'SUCCESS']),
      accountAddress: chance().guid(),
      ip: chance().ip(),
    });
  }

  return data;
};

const rows: AuditEvent[] = generateMockData(100);

function AuditPage() {
  return (
    <PageContent>
      <PageHeader>
        <PageTitle>
          Global Audit Log
        </PageTitle>
      </PageHeader>
      <TableContainer component={Paper}>
        <AuditTable events={rows} />
      </TableContainer>
    </PageContent>
  );
}

export default AuditPage;
