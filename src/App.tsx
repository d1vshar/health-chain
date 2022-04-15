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
import DoctorProfilePage from './pages/DoctorProfilePage';

export interface NavRoute {
  href: string,
  label: string,
  navBar: boolean
  component: () => React.ReactElement,
  children?: NavRoute[]
}

const routes: NavRoute[] = [
  {
    href: '/',
    label: 'Dashboard',
    navBar: true,
    component: DashboardPage,
  },
  {
    href: 'patients',
    label: 'Patients',
    navBar: true,
    component: PatientsPage,
  },
  {
    href: 'doctors',
    label: 'Doctors',
    navBar: true,
    component: DoctorsPage,
  },
  {
    href: 'audit',
    label: 'Audit',
    navBar: true,
    component: AuditPage,
  },
  {
    href: 'doctor/:id',
    label: 'Doctor Page',
    navBar: false,
    component: DoctorProfilePage,
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
            pic="https://www.med.unc.edu/pgc/wp-content/uploads/sites/959/2020/07/aiims-logo.png"
          />
        </AppBar>
        <Routes>
          {routes.map(({ href, component, children }) => (
            <Route
              path={href}
              element={React.createElement(component)}
            >
              {children ? children.map((childRoute) => (
                <Route
                  path={childRoute.href}
                  element={React.createElement(childRoute.component)}
                />
              )) : null}
            </Route>
          ))}
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
