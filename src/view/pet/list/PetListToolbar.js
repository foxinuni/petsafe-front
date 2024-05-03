import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { Button, Tooltip, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import petSelectors from 'modules/pet/petSelectors';
import selectors from 'modules/pet/list/petListSelectors';
import actions from 'modules/pet/list/petListActions';
import { Link } from 'react-router-dom';
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  FileExcelOutlined,
  UploadOutlined,
} from '@ant-design/icons';

class PetToolbar extends Component {
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
        icon={<FileExcelOutlined />}
        onClick={this.doExport}
        loading={exportLoading}
        style={{ margin: '0 8px' }}
      >
        {'Exportar'}
      </Button>
    );

    if (disabled) {
      return (
        <Tooltip title={'No hya informacion para exportar'}>
          {button}
        </Tooltip>
      );
    }

    return button;
  }

  render() {
    return (
      <Toolbar
        style={{
          background: '#f0f2f5',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        {this.props.hasPermissionToCreate && (
          <Link to="/pet/new">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ margin: '0 8px' }}
            >
              {'Nuevo'}
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
    hasRows: selectors.selectHasRows(state),
    hasPermissionToEdit:
      petSelectors.selectPermissionToEdit(state),
    hasPermissionToDestroy:
      petSelectors.selectPermissionToDestroy(state),
    hasPermissionToCreate:
      petSelectors.selectPermissionToCreate(state),
  };
}

export default connect(select)(PetToolbar);
