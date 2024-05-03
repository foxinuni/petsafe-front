import authSelectors from 'modules/auth/authSelectors';
import layoutSelectors from 'modules/layout/layoutSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route as MyRoute,
  Switch as MySwitch,
  withRouter,
} from 'react-router-dom';
import PrivateRoute from 'view/shared/routes/PrivateRoute';
import PublicRoute from 'view/shared/routes/PublicRoute';
import CustomLoadable from 'view/shared/CustomLoadable';
import ProgressBar from 'view/shared/ProgressBar';
import routes from 'view/routes';

class RoutesComponent extends Component {
  componentWillMount() {
    if (this.props.loading) {
      ProgressBar.start();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading === this.props.loading) {
      return;
    }

    if (!this.props.loading) {
      ProgressBar.done();
    }
  }

  get currentUser() {
    return this.props.currentUser;
  }

  render() {
    if (this.props.loading) {
      return <div />;
    }
    console.log('render desde RoutesComponent');
    return (
      <MySwitch>
        {routes.publicRoutes.map((route) => (
          <PublicRoute
            key={route.path}
            exact
            path={route.path}
            currentUser={this.currentUser}
            component={CustomLoadable({
              loader: route.loader,
            })}
          />
        ))}

        {routes.privateRoutes.map((route) => (
          <PrivateRoute
            key={route.path}
            currentUser={this.currentUser}
            permissionRequired={route.permissionRequired}
            path={route.path}
            component={CustomLoadable({
              loader: route.loader,
            })}
            exact={!!route.exact}
          />
        ))}

        {routes.errorRoutes.map((route) => (
          <MyRoute
            key={route.path}
            exact
            path={route.path}
            component={CustomLoadable({
              loader: route.loader,
            })}
          />
        ))}
      </MySwitch>
    );
  }
}

const select = (state) => ({
  loading:
    authSelectors.selectLoadingInit(state) ||
    layoutSelectors.selectLoading(state),
  currentUser: authSelectors.selectCurrentUser(state),
});

export default withRouter(connect(select)(RoutesComponent));
