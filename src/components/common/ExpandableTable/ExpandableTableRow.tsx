/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TableCell, TableRow } from '@mui/material';

interface ExpandableTableRowProps {
  children: React.ReactNode | React.ReactNode[]
  expandedComponent: React.ReactNode
  dataKey?: string
  isActive?: boolean
  onClick?: (a: string) => void
  [key: string]: any
}

function ExpandableTableRow({
  dataKey, isActive, onClick, children, expandedComponent, ...props
}: ExpandableTableRowProps) {
  return (
    <>
      <TableRow
        {...props}
        onClick={() => onClick!(dataKey!)}
        sx={{
          cursor: 'pointer',
        }}
      >
        {children}
      </TableRow>
      {isActive && (
        <TableRow>
          <TableCell colSpan={2} padding="checkbox">
            {expandedComponent}
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default ExpandableTableRow;
