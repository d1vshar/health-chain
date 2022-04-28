import React, { ReactNode, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import authAtom from './store/authState';

interface PrivateRouteProps {
  children?: ReactNode | ReactNode[]
  path: string
  element: ReactNode
}

function PrivateRoute({ children, path, element }: PrivateRouteProps) {
  const authState = useRecoilValue(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState === null) { navigate('/'); }
  }, [authState, navigate]);

  return (
    <Route
      path={path}
      element={element}
    >
      {children}
    </Route>
  );
}

PrivateRoute.defaultProps = {
  children: null,
};

export default PrivateRoute;
