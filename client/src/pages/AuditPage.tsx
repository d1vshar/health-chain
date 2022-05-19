import React from 'react';
import {
  Paper, TableContainer,
} from '@mui/material';
// import chance from 'chance';
import PageHeader from '../components/Page/PageHeader';
import PageTitle from '../components/Page/PageTitle';
import type { AuditEvent } from '../types';
import AuditTable from '../components/Audit/AuditTable';
import PageContent from '../components/Page/PageContent';
import getAllAuditEvents from '../api/AuditEndpoint';

function AuditPage() {
  const [rows, setRows] = React.useState<AuditEvent[] | null>(null);

  React.useEffect(() => {
    (async () => {
      const events:AuditEvent[] | null = (await getAllAuditEvents())!.data!.audit;
      console.log('events is ', events);
      setRows(events);
    })();
  }, []);

  return (
    <PageContent>
      <PageHeader>
        <PageTitle>
          Global Audit Log
        </PageTitle>
      </PageHeader>
      <TableContainer component={Paper}>
        <AuditTable events={rows || []} />
      </TableContainer>
    </PageContent>
  );
}

export default AuditPage;
