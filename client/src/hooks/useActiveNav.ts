import { useLocation, useResolvedPath } from 'react-router-dom';

function useActiveNav(to: string) {
  const location = useLocation();
  const path = useResolvedPath(to);

  const locationPathname = location.pathname.toLowerCase();
  const toPathname = path.pathname.toLowerCase();
  const isActive = locationPathname === toPathname
      || (locationPathname.startsWith(toPathname)
        && locationPathname.charAt(toPathname.length) === '/');

  return isActive;
}

export default useActiveNav;
