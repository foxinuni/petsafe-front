import { Button, Popconfirm } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from 'view/shared/styles/Toolbar';
import { connect } from 'react-redux';
import petSelectors from 'modules/pet/petSelectors';

class PetViewToolbar extends Component {
  id = () => {
    return this.props.match.params.id;
  };

  doDestroy = () => {
    const { dispatch } = this.props;
    //  dispatch(destroyActions.doDestroy(this.id()));
  };

  render() {
    console.log('render desde PetViewToolbar');
    const {
      hasPermissionToEdit,
      hasPermissionToDestroy,
      destroyLoading,
    } = this.props;

    return (
      <Toolbar>
        {hasPermissionToEdit && (
          <Link to={`/pet/${this.id()}/edit`}>
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
      petSelectors.selectPermissionToEdit(state),
    hasPermissionToDestroy:
      petSelectors.selectPermissionToDestroy(state),
    destroyLoading: petSelectors.selectLoading(state), //este selector toca implementarlo en petSelectors, no existe, undefined si se intenta
  };
}

export default connect(select)(PetViewToolbar);
