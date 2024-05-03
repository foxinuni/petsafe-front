import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { Button, Tooltip } from 'antd';
import { connect } from 'react-redux';
import userSelectors from 'modules/user/userSelectors';
import rolSelectors from 'modules/rol/rolSelectors';
import { Link } from 'react-router-dom';

class RolToolbar extends Component {
  render() {
    return (
      <Toolbar>
        {this.props.hasPermissionToCreate && (
          <Link to="/roles/new">
            <Button type="primary">{'Nuevo'}</Button>
          </Link>
        )}
      </Toolbar>
    );
  }
}

function select(state) {
  return {
    loading: rolSelectors.selectLoading(state),
    hasPermissionToEdit:
      userSelectors.selectPermissionToEdit(state),
    hasPermissionToCreate:
      userSelectors.selectPermissionToCreate(state),
  };
}

export default connect(select)(RolToolbar);
