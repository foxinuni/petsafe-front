import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { Button, Tooltip } from 'antd';
import { connect } from 'react-redux';
import authSelectors from 'authorization/authorizationSelector';
import rolSelectors from 'modules/rol/rolSelectors';
import { Link } from 'react-router-dom';

class RolToolbar extends Component {
  render() {
    return (
      <Toolbar>
        {(this.props.permissionToManage && (
          <Link to="/roles/new">
            <Button type="primary">{'Nuevo'}</Button>
          </Link>
        )) ||
          null}
      </Toolbar>
    );
  }
}

function select(state) {
  return {
    loading: rolSelectors.selectLoading(state),
    permissionToManage: authSelectors.selectPermManageRoles(state),
  };
}

export default connect(select)(RolToolbar);
