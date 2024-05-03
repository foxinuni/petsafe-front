import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { Button, Tooltip, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import bookingSelectors from 'modules/booking/bookingSelectors';
import selectors from 'modules/booking/list/bookingListSelectors';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';
import actions from 'modules/booking/list/bookingListActions';
import { Link } from 'react-router-dom';

class BookingToolbar extends Component {
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
        icon="file-excel"
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
    console.log('render desde BookingListToolbar');
    return (
      <Toolbar>
        {this.props.hasPermissionToCreate && (
          <Link to="/booking/new">
            <Button type="primary" icon="plus">
              {'Nueva'}
            </Button>
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
      bookingSelectors.selectPermissionToEdit(state),
    hasPermissionToCreate:
      bookingSelectors.selectPermissionToCreate(state),
  };
}

export default connect(select)(BookingToolbar);
