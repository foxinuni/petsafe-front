import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { Button, Tooltip } from 'antd';
import { connect } from 'react-redux';
import iamSelectors from 'modules/user/userSelectors';
import selectors from 'modules/user/list/userListSelectors';
import actions from 'modules/user/list/userListActions';
import { Link } from 'react-router-dom';

class UserUsersToolbar extends Component {
  doExport = () => {
    const { dispatch } = this.props;
    dispatch(actions.doExport());
  };

  renderExportButton() {
    const { loading, exportLoading } = this.props;

    const disabled = loading;

    const button = (
      <Button
        disabled={disabled}
        onClick={this.doExport}
        loading={exportLoading}
      >
        {'Exportar'}
      </Button>
    );

    if (disabled) {
      return (
        <Tooltip title={'No hay informacion para exportar'}>
          {button}
        </Tooltip>
      );
    }

    return button;
  }

  render() {
    console.log('render desde IamUsersToolbar');
    return (
      <Toolbar>
        {this.props.hasPermissionToCreate && (
          <Link to="/user/new">
            <Button type="primary">{'Nuevo'}</Button>
          </Link>
        )}

        {this.renderExportButton()}
      </Toolbar>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    exportLoading: selectors.selectExportLoading(state),
    hasPermissionToEdit:
      iamSelectors.selectPermissionToEdit(state),
    hasPermissionToCreate:
      iamSelectors.selectPermissionToCreate(state),
  };
}

export default connect(select)(UserUsersToolbar);
