import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { connect } from 'react-redux';
import authSelector from 'authorization/authorizationSelector';
import { selectors } from 'modules/reservation/reservListActions';

class ReservToolbar extends Component {
  render() {
    return <Toolbar></Toolbar>;
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
