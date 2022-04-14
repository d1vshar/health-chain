import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Navigation/NavBar';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import theme from './theme';

export type NavRoute = {
  href: string
  label: string
  component: () => React.ReactElement
};

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
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <NavBar routes={routes} />
        <Routes>
          {routes.map(({ href, component }) => (
            <Route path={href} element={React.createElement(component)} />
          ))}
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
