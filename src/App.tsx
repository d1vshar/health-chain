import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import NavBar from './components/AppBar/Navigation/NavBar';
import ProfileBox from './components/AppBar/Profile/ProfileBox';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import theme from './theme';

export interface NavRoute {
  href: string,
  label: string,
  component: () => React.ReactElement,
}

const routes: NavRoute[] = [
  {
    href: '/',
    label: 'Dashboard',
    component: DashboardPage,
  },
  {
    href: '/patients',
    label: 'Patients',
    component: PatientsPage,
  },
  {
    href: '/doctors',
    label: 'Doctors',
    component: PatientsPage,
  },

  {
    href: '/audit',
    label: 'Audit',
    component: PatientsPage,
  },
];

function App() {
  return (
    <ThemeProvider
      theme={theme}
    >
      <CssBaseline />
      <Container
        maxWidth="xl"
      >
        <AppBar>
          <NavBar
            routes={routes}
          />
          <ProfileBox
            name="Divyanshu"
            address="1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8"
            pic="https://avatars.githubusercontent.com/u/32746859?v=4"
          />
        </AppBar>
        <Routes>
          {routes.map(({ href, component }) => (
            <Route
              path={href}
              element={React.createElement(component)}
            />
          ))}
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
