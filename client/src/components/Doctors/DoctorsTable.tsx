import React, { useEffect } from 'react';
import {
  Table, TableHead, TableRow, TableBody, TableCell, Tooltip, Typography, Button, Box,
} from '@mui/material';
import { FingerPrintIcon } from '@heroicons/react/solid';
import { Doctor, Pagination } from '../../api';
import useTablePaginator from '../../hooks/useTablePaginator';

interface DoctorsTableProps {
  doctors: Doctor[]
  pagination: Pagination | null
  onNextPage: () => void | null
  onPrevPage: () => void | null
}

function DoctorsTable({
  doctors, pagination, onNextPage, onPrevPage,
}: DoctorsTableProps) {
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
              ID
            </TableCell>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Gender
            </TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow
              key={doctor.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Tooltip title={doctor.id}>
                  <FingerPrintIcon
                    height="24px"
                    width="24px"
                  />
                </Tooltip>
              </TableCell>
              <TableCell>
                {doctor.id}
              </TableCell>
              <TableCell>
                {doctor.name}
              </TableCell>
              <TableCell>
                {doctor.gender}
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default DoctorsTable;
