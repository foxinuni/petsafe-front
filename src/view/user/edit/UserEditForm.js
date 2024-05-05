import { Button, Form } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/user/form/userFormActions';
import selectors from 'modules/user/form/userFormSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'view/shared/Spinner';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import selectorsRoles from 'modules/rol/rolSelectors';
import authSelector from 'authorization/authorizationSelector';
import * as Yup from 'yup';

class UserEditForm extends Component {
  schema = Yup.object().shape({
    email: Yup.string(),
    name: Yup.string().required('Debe ingresar un nombre'),
    surname: Yup.string().required('Debe ingresar un nombre'),
    number: Yup.number().integer().required('Debe ingresar su telefono'),
  });

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id, this.props.token));
  }

  handleSubmit = (values) => {
    const { dispatch, user } = this.props;
    const data = {
      ...values,
    };
    delete data.email;
    dispatch(actions.doUpdate(user.id, data, this.props.token));
  };

  initialValues = () => {
    const user = { ...this.props.user };
    user.role = user.role.id;
    return user;
  };

  renderForm() {
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
                <ViewFormItem name={'email'} label={'Correo'} />
                <ViewFormItem name={'createdAt'} label={'Fecha creacion'} />
                <ViewFormItem
                  name={'updatedAt'}
                  label={'Ultima actualizacion'}
                />
                <InputFormItem name={'name'} label={'Nombres'} autoFocus />

                <InputFormItem
                  name={'surname'}
                  label={'Apellidos'}
                  autoComplete={'surname'}
                />

                <InputFormItem
                  name={'number'}
                  label={'Numero telefonico'}
                  autoComplete={'number'}
                  prefix={'+'}
                />

                <SelectFormItem
                  name={'role'}
                  label={'Rol'}
                  options={this.props.roles.map((rol) => {
                    return {
                      id: rol.id,
                      title: rol.name,
                      label: rol.name,
                      value: rol.id,
                    };
                  })}
                />

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
  }

  render() {
    const { findLoading, user } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (!user) {
      return null;
    }

    return this.renderForm();
  }
}

function select(state) {
  return {
    findLoading: selectors.selectFindLoading(state),
    saveLoading: selectors.selectSaveLoading(state),
    user: selectors.selectUser(state),
    roles: selectorsRoles.selectRoles(state),
    token: authSelector.selectToken(state),
  };
}

export default connect(select)(UserEditForm);
