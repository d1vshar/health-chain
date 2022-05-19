import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Box, Card, CardContent, Stack, Typography,
} from '@mui/material';
import chance from 'chance';
import { Line } from 'react-chartjs-2';
import PageContent from '../components/Page/PageContent';
import PageHeader from '../components/Page/PageHeader';
import PageTitle from '../components/Page/PageTitle';
import PatientRecordsTable from '../components/Patients/PatientRecordsTable';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      tension: 0.1,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 1',
      data: labels.map(() => chance().integer({ min: 60, max: 110 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

function DashboardPage() {
  return (
    <PageContent>
      <PageHeader>
        <PageTitle>
          Dashboard
        </PageTitle>
      </PageHeader>
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
      >
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={8}
        >
          <Card
            // variant="outlined"
            sx={{ minWidth: 275 }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                HEARTBEAT (BPM)
              </Typography>
            </CardContent>
            <Line options={options} data={data} />
          </Card>
          <Card
            // variant="outlined"
            sx={{ minWidth: 275 }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                HEARTBEAT (BPM)
              </Typography>
            </CardContent>
            <Line options={options} data={data} />
          </Card>
          <Card
            // variant="outlined"
            sx={{ minWidth: 275 }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                HEARTBEAT (BPM)
              </Typography>
            </CardContent>
            <Line options={options} data={data} />
          </Card>
          <Card
            // variant="outlined"
            sx={{ minWidth: 275 }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                HEARTBEAT (BPM)
              </Typography>
            </CardContent>
            <Line options={options} data={data} />
          </Card>
        </Stack>
      </Box>
      <PatientRecordsTable />
    </PageContent>
  );
}

export default DashboardPage;
