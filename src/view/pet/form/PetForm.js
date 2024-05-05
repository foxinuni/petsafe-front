import { Button, Form } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/pet/form/petFormActions';
import selectors from 'modules/pet/form/petFormSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import authSelector from 'authorization/authorizationSelector';
import petSelectors from 'modules/pet/form/petFormSelectors';
import petActions from 'modules/pet/form/petFormActions';
import selectorAuth from 'modules/auth/authSelectors';
import * as Yup from 'yup';

class PetForm extends Component {
  schema = Yup.object().shape({
    name: Yup.string().required('Debe ingresar un nombre'),
    breed: Yup.string().required('Debe seleccionar una raza'),
    age: Yup.number().integer().required('Debe ingresar la edad'),
  });

  componentWillMount() {
    const { dispatch } = this.props;
    if (this.props.pemissionUsers)
      dispatch(petActions.getAllUsers(this.props.token));
    dispatch(petActions.getAllBreeds(this.props.token));
  }
  componentDidMount() {
    const { dispatch, match } = this.props;

    if (this.isEditing()) {
      dispatch(actions.doFind(match.params.id));
    } else {
      dispatch(actions.doNew());
    }
  }

  isEditing() {
    const { match } = this.props;
    return !!match.params.id;
  }
  handleSubmit = (values) => {
    const { dispatch, pet } = this.props;
    if (!values.owner) {
      values.me = true;
      values.owner = this.props.currentUser.id;
    }
    if (!values.state) {
      values.state = '7e68b58b-9a70-49b9-be76-4062cf9ed39d';
    }

    if (this.isEditing()) {
      dispatch(actions.doUpdate(pet.id, values, this.props.token));
    } else {
      dispatch(actions.doCreate(values, this.props.token));
    }
  };

  initialValues = () => {
    const pet = this.props.pet;

    if (this.isEditing() && pet) {
      return pet;
    }

    return {
      name: '',
      owner: '',
      breed: '',
      state: '',
      reservations: '',
    };
  };

  renderForm() {
    if (this.props.breeds) {
      const { saveLoading } = this.props;

      return (
        <FormWrapper>
          <Formik
            initialValues={this.initialValues()}
            validationSchema={this.schema}
            onSubmit={this.handleSubmit}
            render={(form) => {
              return (
                <Form onFinish={form.handleSubmit}>
                  {!this.isEditing() && this.props.permissionToManage && (
                    <SelectFormItem
                      name={'owner'}
                      label={'Dueño'}
                      required={true}
                      options={this.props.users.rows.map((user) => ({
                        id: user.id,
                        value: user.id,
                        title: user.name,
                        label: user.name,
                      }))}
                    />
                  )}
                  {this.isEditing() && (
                    <SelectFormItem
                      name={'state'}
                      label={'Estado'}
                      required={true}
                      options={[
                        {
                          id: '7e68b58b-9a70-49b9-be76-4062cf9ed39d',
                          label: 'Vivo',
                          value: '7e68b58b-9a70-49b9-be76-4062cf9ed39d',
                          title: 'Vivo',
                        },
                        {
                          id: 'fa6e2e74-c0a7-496c-a1ae-05f80b72818d	',
                          label: 'Muerto',
                          value: 'fa6e2e74-c0a7-496c-a1ae-05f80b72818d	',
                          title: 'Muerto',
                        },
                      ]}
                    />
                  )}
                  {this.isEditing() && !this.props.permissionToManage && (
                    <ViewFormItem name={'owner'} label={'Dueño'} />
                  )}
                  <InputFormItem
                    name={'name'}
                    label={'Nombre'}
                    required={true}
                  />
                  <InputFormItem name={'age'} label={'Edad'} required={true} />
                  <SelectFormItem
                    name={'breed'}
                    label={'Raza'}
                    required={true}
                    options={this.props.breeds.map((breed) => ({
                      id: breed.id,
                      value: breed.id,
                      label: breed.name,
                      title: breed.name,
                    }))}
                  />

                  {this.isEditing() && !this.props.permissionToSeeReserv && (
                    <ViewFormItem
                      name={'reservations'}
                      label={'Reservaciones'}
                    />
                  )}

                  <Form.Item className="form-buttons" {...tailFormItemLayout}>
                    <Button
                      loading={saveLoading}
                      type="primary"
                      htmlType="submit"
                    >
                      {'Guardar'}
                    </Button>

                    <Button disabled={saveLoading} onClick={form.handleReset}>
                      {'Resetear'}
                    </Button>
                  </Form.Item>
                </Form>
              );
            }}
          />
        </FormWrapper>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  render() {
    const { findLoading, pet } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (this.isEditing() && !pet) {
      return <Spinner />;
    }

    return this.renderForm();
  }
}

function select(state) {
  return {
    findLoading: selectors.selectFindLoading(state),
    saveLoading: selectors.selectSaveLoading(state),
    pet: selectors.selectPet(state),
    token: authSelector.selectToken(state),
    users: petSelectors.selectUsers(state),
    breeds: petSelectors.selectBreeds(state),
    permissionToManage: authSelector.selectPermManagePets(state),
    permissionToSeeReserv: authSelector.selectPermViewReserv(state),
    currentUser: selectorAuth.selectCurrentUser(state),
    pemissionUsers: authSelector.selectPermViewProfiles(state),
  };
}

export default connect(select)(PetForm);
