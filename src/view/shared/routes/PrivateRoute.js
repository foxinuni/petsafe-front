import PermissionChecker from 'authorization/permissionChecker';
import React from 'react';
import { Redirect, Route as MyRoute } from 'react-router-dom';

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
        const permissionChecker = new PermissionChecker(currentUser);

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
        if (!permissionChecker.match(permissionRequired)) {
          return <Redirect to="/auth/signin" />;
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
