import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import type { NavRoute } from './App';
import AppBar from './components/AppBar/AppBar';
import NavBar from './components/AppBar/Navigation/NavBar';
import ProfileBox from './components/AppBar/Profile/ProfileBox';
import authAtom from './store/authState';

interface AppBarHOCProps {
  routes: NavRoute[]
  children: ReactNode | ReactNode[]
  auth: boolean
}

function AppBarHOC({ routes, children, auth }: AppBarHOCProps) {
  const [authState] = useRecoilState(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && authState === null) { navigate('/'); }
  }, [auth, authState, navigate]);

  return (
    <>
      <AppBar>
        <NavBar
          routes={routes}
        />
        <ProfileBox
          name="AIIMS Delhi"
          userRole="Hospital"
          address="1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8"
          pic="https://www.med.unc.edu/pgc/wp-content/uploads/sites/959/2020/07/aiims-logo.png"
        />
      </AppBar>
      {children}
    </>
  );
}

export default AppBarHOC;
