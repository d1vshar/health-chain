import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import NavBar from './components/AppBar/Navigation/NavBar';
import ProfileBox from './components/AppBar/Profile/ProfileBox';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import DoctorsPage from './pages/DoctorsPage';
import AuditPage from './pages/AuditPage';
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
    component: DoctorsPage,
  },

  {
    href: '/audit',
    label: 'Audit',
    component: AuditPage,
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
            name="AIIMS Delhi"
            userRole="Hospital"
            address="1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8"
            pic="https://upload.wikimedia.org/wikipedia/en/8/85/All_India_Institute_of_Medical_Sciences%2C_Delhi.svg"
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
