import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { Button, Tooltip } from 'antd';
import { connect } from 'react-redux';
import userSelectors from 'modules/user/userSelectors';
import selectors from 'modules/user/list/userListSelectors';
import { Link } from 'react-router-dom';

class UserUsersToolbar extends Component {
  doExport = () => {
    const { dispatch } = this.props;
    //a implementar exportacion excel
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
    console.log('render desde UsersToolbar');
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
      userSelectors.selectPermissionToEdit(state),
    hasPermissionToCreate:
      userSelectors.selectPermissionToCreate(state),
  };
}

export default connect(select)(UserUsersToolbar);
