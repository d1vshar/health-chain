import { useEffect, useState } from 'react';

function useTablePaginator(max: number) {
  const [pageNum, setPageNum] = useState(1);
  const [hasNext, setHasNext] = useState<boolean>(() => {
    if (pageNum < max) return true;
    return false;
  });
  const [hasPrev, setHasPrev] = useState<boolean>(false);

  useEffect(() => {
    if (pageNum < max) setHasNext(true);
    if (pageNum > 1) setHasPrev(true);
  }, [pageNum, max]);

  const next = () => {
    if (hasNext) setPageNum(pageNum + 1);
  };

  const previous = () => {
    if (hasPrev) setPageNum(pageNum - 1);
  };

  return [pageNum, hasNext, hasPrev, next, previous];
}

export default useTablePaginator;
