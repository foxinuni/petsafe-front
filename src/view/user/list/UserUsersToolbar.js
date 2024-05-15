import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { Button, Tooltip } from 'antd';
import { connect } from 'react-redux';
import authSelectors from 'authorization/authorizationSelector';
import { selectors } from 'modules/user/userListActions';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

class UserUsersToolbar extends Component {
  render() {
    return (
      <Toolbar>
        {(this.props.permissionToManage && (
          <Link to="/user/new">
            <Button type="primary" icon={<PlusOutlined />}>
              {'Nuevo'}
            </Button>
          </Link>
        )) ||
          null}
      </Toolbar>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    exportLoading: selectors.selectExportLoading(state),
    permissionToManage: authSelectors.selectPermManageProfiles(state),
  };
}

export default connect(select)(UserUsersToolbar);
