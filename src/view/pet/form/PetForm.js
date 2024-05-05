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
import * as Yup from 'yup';

class PetForm extends Component {
  schema = Yup.object().shape({
    name: Yup.string().required('Debe ingresar un nombre'),
    breed: Yup.string().required('Debe seleccionar una raza'),
    age: Yup.number().integer().required('Debe ingresar la edad'),
  });

  componentWillMount() {
    const { dispatch } = this.props;
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
    const { dispatch, match } = this.props;
    const { id, ...data } = this.schema.cast(values);

    if (this.isEditing()) {
      dispatch(actions.doUpdate(id, data, this.props.token));
    } else {
      dispatch(actions.doCreate(data, this.props.token));
    }
  };

  initialValues = () => {
    const record = this.props.record;

    if (this.isEditing() && record) {
      return record;
    }

    return {
      name: '',
      owner: '',
      breed: '',
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
                      options={[
                        {
                          id: 1,
                          value: 'juandiego',
                          title: 'juandiego',
                          label: 'juandiego',
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
    const { findLoading, record } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (this.isEditing() && !record) {
      return <Spinner />;
    }

    return this.renderForm();
  }
}

function select(state) {
  return {
    findLoading: selectors.selectFindLoading(state),
    saveLoading: selectors.selectSaveLoading(state),
    record: selectors.selectPet(state),
    token: authSelector.selectToken(state),
    users: petSelectors.selectUsers(state),
    breeds: petSelectors.selectBreeds(state),
    permissionToManage: authSelector.selectPermManagePets(state),
    permissionToSeeReserv: authSelector.selectPermViewReserv(state),
  };
}

export default connect(select)(PetForm);
