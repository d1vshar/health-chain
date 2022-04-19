import React, { useEffect } from 'react';
import {
  Table, TableHead, TableRow, TableBody, TableCell, Tooltip, Button, Box, Typography,
} from '@mui/material';
import { FingerPrintIcon } from '@heroicons/react/solid';
import { Pagination, Patient } from '../../api';
import useTablePaginator from '../../hooks/useTablePaginator';

interface PatientsTableProps {
  patients: Patient[]
  pagination: Pagination | null
  onNextPage: () => void | null
  onPrevPage: () => void | null
}

function PatientsTable({
  patients, pagination, onNextPage, onPrevPage,
}: PatientsTableProps) {
  const [
    pageNum,
    hasNextPage,
    hasPrevPage,
    setPageNum,
  ] = useTablePaginator(pagination?.page_count || 1);

  useEffect(() => {
    setPageNum(pagination?.page ? pagination.page : 1);
  }, [pagination?.page, setPageNum]);

  console.log(JSON.stringify(pagination), pageNum, hasNextPage, hasPrevPage);

  return (
    <>
      {pagination && (
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="16px"
      >
        <Typography
          fontWeight="bold"
        >
          {pagination && (
          <>
            Showing
            {' '}
            {(pagination.page - 1) * pagination.page_limit
              + 1}
            {' - '}
            {(pagination.page - 1) * pagination.page_limit
              + pagination.page_limit}
            {' '}
            of
            {' '}
            {pagination?.count || 0}
          </>
          )}
        </Typography>
        <Box
          display="flex"
          maxWidth="256px"
        >
          <Button
            sx={{
              marginX: '16px',
            }}
            disabled={!hasPrevPage}
            onClick={onPrevPage}
          >
            Previous
          </Button>
          <Button
            sx={{
              marginX: '16px',
            }}
            disabled={!hasNextPage}
            onClick={onNextPage}
          >
            Next
          </Button>
        </Box>
      </Box>
      )}
      <Table aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              UUID
            </TableCell>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Date of Birth
            </TableCell>
            <TableCell>
              Date of Death
            </TableCell>
            <TableCell>
              Gender
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Tooltip title={patient.id ? patient.id : 'NA'}>
                  <FingerPrintIcon
                    height="24px"
                    width="24px"
                  />
                </Tooltip>
              </TableCell>
              <TableCell>
                {patient.id}
                {/* <TruncateTooltip text={patient.id} limit={10} /> */}
              </TableCell>
              <TableCell>
                {patient.name}
              </TableCell>
              <TableCell>
                {new Date(patient.dob).toUTCString()}
              </TableCell>
              <TableCell>
                {patient.dod ? new Date(patient.dod).toUTCString() : ''}
              </TableCell>
              <TableCell>
                {patient.gender}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default PatientsTable;
