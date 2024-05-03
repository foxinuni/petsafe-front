import PermissionChecker from 'modules/auth/permissionChecker';
import React from 'react';
import {
  Redirect,
  Route as MyRoute,
} from 'react-router-dom';

function EmptyPermissionsRoute({
  component: Component,
  currentUser,
  ...rest
}) {
  return (
    <MyRoute
      {...rest}
      render={(props) => {
        const permissionChecker = new PermissionChecker(
          currentUser,
        );

        if (!permissionChecker.isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: '/auth/signin',
              }}
            />
          );
        }

        if (!permissionChecker.isEmptyPermissions) {
          return <Redirect to="/" />;
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default EmptyPermissionsRoute;
