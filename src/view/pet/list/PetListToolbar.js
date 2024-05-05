import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { Button, Tooltip } from 'antd';
import { connect } from 'react-redux';
//import selectors from 'modules/pet/list/petListSelectors';
//import actions from 'modules/pet/list/petListActions';

import authSelector from 'authorization/authorizationSelector';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

class PetToolbar extends Component {
  doExport = () => {
    /*const { dispatch } = this.props;
    dispatch(actions.doExport());*/
  };

  renderExportButton() {
    const { hasRows, loading, exportLoading } = this.props;
    const disabled = !hasRows || loading;

    const button = (
      <Button
        disabled={disabled}
        onClick={this.doExport}
        loading={exportLoading}
        style={{ margin: '0 8px' }}
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
    return (
      <Toolbar>
        {(this.props.permissionToManage || this.props.permissionSelf) && (
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
    loading: false,
    exportLoading: false,
    hasRows: false,
    // loading: selectors.selectLoading(state),
    //exportLoading: selectors.selectExportLoading(state),
    //hasRows: selectors.selectHasRows(state),
    permissionToManage: authSelector.selectPermManagePets(state),
    permissionSelf: authSelector.selectPermSelfPets(state),
  };
}

export default connect(select)(PetToolbar);