import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getPatientById } from './api/PatientEndppoint';
import type { NavRoute } from './App';
import AppBar from './components/AppBar/AppBar';
import NavBar from './components/AppBar/Navigation/NavBar';
import ProfileBox from './components/AppBar/Profile/ProfileBox';
import authAtom from './store/authState';
import userAtom from './store/userState';

interface AppBarHOCProps {
  routes: NavRoute[]
  children: ReactNode | ReactNode[]
  auth: boolean
}

function AppBarHOC({ routes, children, auth }: AppBarHOCProps) {
  const authState = useRecoilValue(authAtom);
  const [userState, setUserState] = useRecoilState(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && authState === null) { navigate('/'); }
    if (authState !== null) {
      const fetchData = async () => {
        if (authState?.role === 'PATIENT') {
          const apiResponse = await getPatientById(authState, authState.id);
          if (apiResponse && apiResponse.data) {
            setUserState({
              id: apiResponse.data.patient.id,
              role: 'PATIENT',
              publicAddress: authState.publicAddress,
              name: apiResponse.data.patient.name,
            });
          }
        }
      };

      fetchData();
    }
  }, [auth, authState, navigate, setUserState]);

  return (
    <>
      <AppBar>
        <NavBar
          routes={routes}
        />
        <ProfileBox
          name={userState?.name || ''}
          userRole={userState?.role || ''}
          address={userState?.publicAddress || ''}
          pic="https://cn.i.cdn.ti-platform.com/content/20/the-amazing-world-of-gumball/showpage/za/gumball-carousel.a94b8e60.png"
        />
      </AppBar>
      {children}
    </>
  );
}

export default AppBarHOC;
