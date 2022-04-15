import React from 'react';
import {
  Table, TableHead, TableRow, TableBody, TableCell, Tooltip,
} from '@mui/material';
import { FingerPrintIcon } from '@heroicons/react/solid';
import { AuditEvent } from '../../types';
import TruncateTooltip from '../common/TruncateTooltip';

interface AuditTableProps {
  events: AuditEvent[]
}

function AuditTable({ events }: AuditTableProps) {
  return (
    <Table aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>
            Timestamp
          </TableCell>
          <TableCell>
            Event Type
          </TableCell>
          <TableCell>
            Status
          </TableCell>
          <TableCell>
            User Address
          </TableCell>
          <TableCell>
            IP
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {events.map((event) => (
          <TableRow
            key={event.eventAddress}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell>
              <Tooltip title={event.eventAddress}>
                <FingerPrintIcon
                  height="24x"
                  width="24px"
                />
              </Tooltip>
            </TableCell>
            <TableCell>{event.timestamp.toISOString()}</TableCell>
            <TableCell>{event.eventType}</TableCell>
            <TableCell>{event.status}</TableCell>
            <TableCell>
              <TruncateTooltip
                text={event.accountAddress}
                limit={12}
              />
            </TableCell>
            <TableCell>{event.ip}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AuditTable;
