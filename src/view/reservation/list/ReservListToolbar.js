import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { Button, Tooltip, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import authSelector from 'authorization/authorizationSelector';
import { selectors } from 'modules/reservation/reservListActions';

class ReservToolbar extends Component {
  doExport = () => {
    //action export
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
        <Tooltip title={'No hay informacion para exportar'}>{button}</Tooltip>
      );
    }

    return button;
  }

  render() {
    return <Toolbar>{this.renderExportButton()}</Toolbar>;
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    exportLoading: selectors.selectExportLoading(state),
    permissionToEdit: authSelector.selectPermManageReserv(state),
  };
}

export default connect(select)(ReservToolbar);
