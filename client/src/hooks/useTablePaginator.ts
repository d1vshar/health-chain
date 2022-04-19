import { SetStateAction, useEffect, useState } from 'react';

function useTablePaginator(
  max: number,
): [number, boolean, boolean, React.Dispatch<SetStateAction<number>>] {
  const [pageNum, setPageNum] = useState(1);
  const [hasNext, setHasNext] = useState<boolean>(() => {
    if (pageNum < max) return true;
    return false;
  });
  const [hasPrev, setHasPrev] = useState<boolean>(false);

  useEffect(() => {
    if (pageNum < max) setHasNext(true);
    else setHasNext(false);
    if (pageNum > 1) setHasPrev(true);
    else setHasPrev(false);
  }, [pageNum, max]);

  return [pageNum, hasNext, hasPrev, setPageNum];
}

export default useTablePaginator;
