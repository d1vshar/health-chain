import { useLocation, useResolvedPath } from 'react-router-dom';

function useActiveNav(to: string) {
  const location = useLocation();
  const path = useResolvedPath(to);

  const locationPathname = location.pathname.toLowerCase();
  const toPathname = path.pathname.toLowerCase();
  const isActive = locationPathname === toPathname
      || (locationPathname === toPathname.substring(0, toPathname.length - 1)
        && locationPathname.charAt(toPathname.length) === '/');

  console.log('nav', path, locationPathname, isActive);
  return isActive;
}

export default useActiveNav;
