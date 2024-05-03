import { Button, Popconfirm } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from 'view/shared/styles/Toolbar';
import { connect } from 'react-redux';
import bookingSelectors from 'modules/booking/bookingSelectors';

class BookingViewToolbar extends Component {
  id = () => {
    return this.props.match.params.id;
  };

  doDestroy = () => {
    const { dispatch } = this.props;
    // dispatch(destroyActions.doDestroy(this.id()));
  };

  render() {
    const {
      hasPermissionToEdit,
      hasPermissionToDestroy,
      destroyLoading,
    } = this.props;
    console.log('render desde ookingViewToolbar');
    return (
      <Toolbar>
        {hasPermissionToEdit && (
          <Link to={`/booking/${this.id()}/edit`}>
            <Button type="primary" icon="edit">
              {'Editar'}
            </Button>
          </Link>
        )}

        {hasPermissionToDestroy && (
          <Popconfirm
            title={'Estas seguro?'}
            onConfirm={() => this.doDestroy()}
            okText={'Si'}
            cancelText={'No'}
          >
            <Button
              type="primary"
              icon="delete"
              disabled={destroyLoading}
            >
              {'Eliminar'}
            </Button>
          </Popconfirm>
        )}
      </Toolbar>
    );
  }
}

function select(state) {
  return {
    hasPermissionToEdit:
      bookingSelectors.selectPermissionToEdit(state),
    hasPermissionToDestroy:
      bookingSelectors.selectPermissionToDestroy(state),
  };
}

export default connect(select)(BookingViewToolbar);
