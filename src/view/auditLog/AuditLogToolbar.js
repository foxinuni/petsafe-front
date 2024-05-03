import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { Button, Tooltip } from 'antd';
import { connect } from 'react-redux';
import selectors from 'modules/auditLog/auditLogSelectors';
import actions from 'modules/auditLog/auditLogActions';

class AuditLogToolbar extends Component {
  doExport = () => {
    const { dispatch } = this.props;
    dispatch(actions.doExport());
  };

  renderExportButton() {
    const { hasRows, loading, exportLoading } = this.props;

    const disabled = !hasRows || loading;

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
    console.log('render desde auditlogtoolbar');
    return <Toolbar>{this.renderExportButton()}</Toolbar>;
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    exportLoading: selectors.selectExportLoading(state),
    hasRows: selectors.selectHasRows(state),
  };
}

export default connect(select)(AuditLogToolbar);
