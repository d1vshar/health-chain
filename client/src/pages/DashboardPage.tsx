import React, { useEffect, useState } from 'react';
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
  Box, Stack, Typography,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import { useRecoilState, useRecoilValue } from 'recoil';
import PageContent from '../components/Page/PageContent';
import PageHeader from '../components/Page/PageHeader';
import PageTitle from '../components/Page/PageTitle';
import PatientRecordsTable from '../components/Patients/PatientRecordsTable';
import recordListStateFamily from '../store/recordListStateFamilty';
import authAtom from '../store/authState';
import { VitalRecord } from '../api';

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
      min: 0,
      max: 200,
      display: false,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 2,
    },
    line: {
      tension: 0.4,
    },
  },
};

function DashboardPage() {
  const authState = useRecoilValue(authAtom);

  const [recordList] = useRecoilState(recordListStateFamily(
    { authState },
  ));

  const [labels, setLabels] = useState<string[]>([]);
  const [tempDataset, setTempDataset] = useState<number[]>([]);
  const [hrDataset, setHRDataset] = useState<number[]>([]);
  const [respDataset, setRespDataset] = useState<number[]>([]);
  const [o2Dataset, setO2Dataset] = useState<number[]>([]);

  const getData = (l: string[], d: number[]) => {
    const max = Math.max(...d);
    const min = Math.min(...d) * 0.1;
    console.log(min, max, l, d);
    return {
      labels,
      datasets: [
        {
          data: d,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    };
  };

  useEffect(() => {
    const generateDataset = (records: VitalRecord[]) => {
      const l: string[] = [];
      const tempD: number[] = [];
      const hrD: number[] = [];
      const respD: number[] = [];
      const o2D: number[] = [];

      for (let i = records.length - 1; i >= 0; i -= 1) {
        const record = records[i];
        l.push(record.id);
        tempD.push(record.temperature || 0);
        hrD.push(record.heartRate || 0);
        respD.push(record.respRate || 0);
        o2D.push(record.o2sat || 0);
      }

      setLabels(l);
      setTempDataset(tempD);
      setHRDataset(hrD);
      setRespDataset(respD);
      setO2Dataset(o2D);
    };

    if (recordList.list) { generateDataset(recordList.list); }
  }, [recordList]);

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
          spacing={4}
        >
          <Box
            sx={{ minWidth: 275 }}
          >
            <Stack
              direction="column"
              width="100%"
              justifyContent="space-between"
              textAlign="center"
            >
              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                TEMPERATURE
              </Typography>
              <Typography sx={{ fontSize: 36, fontWeight: 'bold' }} color="text.primary" gutterBottom>
                {tempDataset[tempDataset.length - 1]}
                ° F
              </Typography>
            </Stack>
            <Line options={options} data={getData(labels, tempDataset)} />
          </Box>
          <Box
            // variant="outlined"
            sx={{ minWidth: 275 }}
          >
            <Stack
              direction="column"
              width="100%"
              justifyContent="space-between"
              textAlign="center"
            >
              <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                HEART RATE
              </Typography>
              <Typography sx={{ fontSize: 36, fontWeight: 'bold' }} color="text.primary" gutterBottom>
                {hrDataset[hrDataset.length - 1]}
                {' '}
                bpm
              </Typography>
            </Stack>
            <Line options={options} data={getData(labels, hrDataset)} />
          </Box>
          <Box
            // variant="outlined"
            sx={{ minWidth: 275 }}
          >
            <Stack
              direction="column"
              width="100%"
              justifyContent="space-between"
              textAlign="center"
            >
              <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                RESPIRATION RATE
              </Typography>
              <Typography sx={{ fontSize: 36, fontWeight: 'bold' }} color="text.primary" gutterBottom>
                {respDataset[respDataset.length - 1]}
                {' '}
                bpm
              </Typography>
            </Stack>
            <Line options={options} data={getData(labels, respDataset)} />
          </Box>
          <Box
            // variant="outlined"
            sx={{ minWidth: 275 }}
          >
            <Stack
              direction="column"
              width="100%"
              justifyContent="space-between"
              textAlign="center"
            >
              <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                O2 LEVEL
              </Typography>
              <Typography sx={{ fontSize: 36, fontWeight: 'bold' }} color="text.primary" gutterBottom>
                {o2Dataset[o2Dataset.length - 1]}
                %
              </Typography>
            </Stack>
            <Line options={options} data={getData(labels, o2Dataset)} />
          </Box>
        </Stack>
      </Box>
      <PatientRecordsTable data={recordList.list || []} />
    </PageContent>
  );
}

export default DashboardPage;
