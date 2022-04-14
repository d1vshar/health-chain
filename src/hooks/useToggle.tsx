import { useState } from 'react';

function useToggle(): [boolean, () => void] {
  const [state, setState] = useState<boolean>(false);

  const toggle = () => {
    setState(!state);
  };

  return [state, toggle];
}

export default useToggle;
