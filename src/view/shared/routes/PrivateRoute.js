import PermissionChecker from 'modules/auth/permissionChecker';
import React from 'react';
import {
  Redirect,
  Route as MyRoute,
} from 'react-router-dom';

function PrivateRoute({
  component: Component,
  currentUser,
  permissionRequired,
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
                state: { from: props.location },
              }}
            />
          );
        }
        if (permissionChecker.isEmptyPermissions) {
          return <Redirect to="/auth/empty-permissions" />;
        }

        if (!permissionChecker.match(permissionRequired)) {
          return <Redirect to="/403" />;
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
