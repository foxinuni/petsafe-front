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
    age: Yup.number().integer().required('Debe ingresar la edad'),
  });

  componentWillMount() {
    const { dispatch } = this.props;
    if (this.props.pemissionUsers)
      dispatch(petActions.getAllUsers(this.props.token));
    dispatch(petActions.getAllTypes(this.props.token));
  }
  componentDidMount() {
    const { dispatch, match, token } = this.props;

    if (this.isEditing()) {
      dispatch(
        actions.doFind(
          match.params.id,
          token,
          this.props.permissionToSeeReserv,
          this.props.permissionToManage,
          this.props.currentUser,
        ),
      );
    } else {
      dispatch(actions.doNew());
    }
  }

  isEditing() {
    const { match } = this.props;
    console.log('match es');
    console.log(match);
    return !!match.params.id;
  }
  handleSubmit = (values) => {
    const { dispatch, pet } = this.props;
    if (!values.owner || !this.props.permissionToManage) {
      values.me = true;
      values.owner = this.props.currentUser.id;
    }
    if (!values.state) {
      values.state = '7e68b58b-9a70-49b9-be76-4062cf9ed39d';
    }

    if (this.isEditing()) {
      dispatch(actions.doUpdate(values, this.props.pet, this.props.token));
    } else {
      dispatch(actions.doCreate(values, this.props.token));
    }
  };

  newType = true;

  handleTypeChange = (value) => {
    const { dispatch } = this.props;
    dispatch(petActions.resetBreeds());
    if (value) {
      dispatch(petActions.getAllBreeds(this.props.token, value));
      this.newType = false;
    } else {
      this.newType = true;
    }
  };
  newBreed = true;
  handleBreedChange = (value) => {
    if (value) this.newBreed = false;
    else this.newBreed = true;
  };
  initialValues = () => {
    const pet = this.props.pet;

    if (this.isEditing() && pet) {
      return { ...pet, owner: pet.owner.name, breed: pet.breed.name };
    }

    return {
      name: '',
      owner: '',
      breed: '',
      state: '',
      age: 0,
      reservations: '',
      createdAt: '',
      updatedAt: '',
    };
  };

  renderForm() {
    if (this.props.types) {
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
                      options={this.props.users?.rows?.map((user) => ({
                        id: user.id,
                        value: user.id,
                        title: user.name,
                        label: user.name,
                      }))}
                    />
                  )}
                  {this.isEditing() && (
                    <ViewFormItem name={'owner'} label={'Dueño'} />
                  )}
                  {this.isEditing() && (
                    <ViewFormItem name={'createdAt'} label={'Creada'} />
                  )}
                  {this.isEditing() && (
                    <ViewFormItem
                      name={'updatedAt'}
                      label={'Ultima actualizacion'}
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
                  <InputFormItem
                    name={'name'}
                    label={'Nombre'}
                    required={true}
                  />
                  <InputFormItem name={'age'} label={'Edad'} required={true} />
                  {!this.isEditing() && (
                    <SelectFormItem
                      name={'type'}
                      label={'Tipo'}
                      options={this.props.types?.map((type) => ({
                        id: type.id,
                        value: type.id,
                        label: type.name,
                        title: type.name,
                      }))}
                      onChange={this.handleTypeChange}
                    />
                  )}
                  {this.newType && !this.isEditing() && (
                    <InputFormItem
                      name={'newType'}
                      label={'Tipo diferente'}
                      required={true}
                    />
                  )}
                  {this.isEditing() && (
                    <ViewFormItem name={'type'} label={'Tipo'} />
                  )}
                  {this.props.breeds && (
                    <SelectFormItem
                      name={'breed'}
                      label={'Raza'}
                      options={this.props.breeds?.map((breed) => ({
                        id: breed.id,
                        value: breed.id,
                        label: breed.name,
                        title: breed.name,
                      }))}
                      onChange={this.handleBreedChange}
                    />
                  )}
                  {this.newBreed && !this.isEditing() && (
                    <InputFormItem
                      name={'newBreed'}
                      label={'Raza distinta'}
                      required={true}
                    />
                  )}
                  {this.isEditing() && (
                    <ViewFormItem name={'breed'} label={'Raza'} />
                  )}

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
    types: petSelectors.selectTypes(state),
    breeds: petSelectors.selectBreeds(state),
    permissionToManage: authSelector.selectPermManagePets(state),
    permissionToSeeReserv: authSelector.selectPermViewReserv(state),
    currentUser: selectorAuth.selectCurrentUser(state),
    pemissionUsers: authSelector.selectPermViewProfiles(state),
  };
}

export default connect(select)(PetForm);
