import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import AppBar from './components/AppBar/AppBar';
// import NavBar from './components/AppBar/Navigation/NavBar';
// import ProfileBox from './components/AppBar/Profile/ProfileBox';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
// import DoctorsPage from './pages/DoctorsPage';
import AuditPage from './pages/AuditPage';
import theme from './theme';
// import DoctorProfilePage from './pages/DoctorProfilePage';
// import PatientProfilePage from './pages/PatientProfilePage';
import AppBarHOC from './AppBarHOC';
import AuthPage from './pages/AuthPage';

export interface NavRoute {
  href: string,
  label: string,
  navBar: boolean
  component: () => React.ReactElement,
  children?: NavRoute[]
}

const routes: NavRoute[] = [
  {
    href: '/app',
    label: 'Dashboard',
    navBar: true,
    component: DashboardPage,
  },
  {
    href: '/app/records',
    label: 'Records',
    navBar: true,
    component: PatientsPage,
  },
  // {
  //   href: 'patient/:id',
  //   label: 'Patients',
  //   navBar: false,
  //   component: PatientProfilePage,
  // },
  // {
  //   href: 'doctors',
  //   label: 'Doctors',
  //   navBar: true,
  //   component: DoctorsPage,
  // },
  // {
  //   href: 'doctor/:id',
  //   label: 'Doctor Page',
  //   navBar: false,
  //   component: DoctorProfilePage,
  // },
  {
    href: '/app/audit',
    label: 'Audit',
    navBar: true,
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
        <Routes>
          {routes.map(({ href, component, children }) => (
            <Route
              key={href}
              path={href}
              element={<AppBarHOC routes={routes} auth>{React.createElement(component)}</AppBarHOC>}
            >
              {children ? children.map((childRoute) => (
                <Route
                  key={childRoute.href}
                  path={childRoute.href}
                  element={React.createElement(childRoute.component)}
                />
              )) : null}
            </Route>
          ))}
          <Route
            path="/"
            element={<AuthPage />}
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
