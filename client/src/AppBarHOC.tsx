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
          name="Divyanshu Sharma"
          userRole="Patient"
          address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
          pic="https://cn.i.cdn.ti-platform.com/content/20/the-amazing-world-of-gumball/showpage/za/gumball-carousel.a94b8e60.png"
        />
      </AppBar>
      {children}
    </>
  );
}

export default AppBarHOC;
