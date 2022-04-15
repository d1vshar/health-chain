import { Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import type { NavRoute } from '../../../App';
import useActiveNav from '../../../hooks/useActiveNav';

interface NavLinkProps {
  route: NavRoute,
}

function NavLink({ route }: NavLinkProps) {
  const isActive = useActiveNav(route.href);

  return (
    <Link
      component={RouterLink}
      to={route.href}
      href={route.href}
      marginRight="32px"
      underline="always"
      sx={{
        fontWeight: isActive ? 'bold' : 'normal',
        textDecorationColor: isActive ? 'black' : null,
        fontSize: '14px',
        textDecorationThickness: '2px',
        textUnderlineOffset: '8px',
      }}
    >
      {route.label}
    </Link>
  );
}

export default NavLink;
