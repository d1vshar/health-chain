import { Tooltip } from '@mui/material';
import React from 'react';
import useTruncate from '../../hooks/useTruncate';

interface TruncateTooltipProps {
  text: string
  limit: number
}

function TruncateTooltip({ text, limit }: TruncateTooltipProps) {
  const trunc = useTruncate(limit);

  return (
    <Tooltip title={text}>
      <span>
        {trunc(text)}
      </span>
    </Tooltip>
  );
}

export default TruncateTooltip;
