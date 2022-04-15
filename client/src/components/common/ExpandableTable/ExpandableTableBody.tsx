/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { TableBody } from '@mui/material';

interface ExpandableTableBodyProps {
  children: React.ReactElement[]
  [key: string]: any
}

function ExpandableTableBody({ children, ...props }: ExpandableTableBodyProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <TableBody
      {...props}
    >
      {children && children.map((child) => {
        if (child.key === selected) {
          return React.cloneElement(
            child,
            { dataKey: child.key, isActive: true, onClick: setSelected },
          );
        }
        return React.cloneElement(
          child,
          { dataKey: child.key, isActive: false, onClick: setSelected },
        );
      })}
    </TableBody>
  );
}

export default ExpandableTableBody;
