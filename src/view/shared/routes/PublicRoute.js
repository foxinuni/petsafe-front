import PermissionChecker from 'authorization/permissionChecker';
import React from 'react';
import { Redirect, Route as MyRoute } from 'react-router-dom';

function PublicRoute({ component: Component, currentUser, ...rest }) {
  return (
    <MyRoute
      {...rest}
      render={(props) => {
        const permissionChecker = new PermissionChecker(currentUser);

        if (permissionChecker.isAuthenticated) {
          return <Redirect to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
}

export default PublicRoute;
