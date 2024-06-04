import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useSelector } from 'react-redux';
import { selectAuthorizationStatus } from '../../store/selectors';
import React from 'react';

type PrivateRouteProps = {
  children: JSX.Element;
}

const PrivateRoute = React.memo(({ children }: PrivateRouteProps): JSX.Element => {
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
});

PrivateRoute.displayName = 'PrivateRoute';

export default PrivateRoute;
