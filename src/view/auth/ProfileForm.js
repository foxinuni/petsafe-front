import { Button, Form } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/auth/authActions';
import selectors from 'modules/auth/authSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import * as Yup from 'yup';

class ProfileFormPage extends Component {
  schema = Yup.object().shape({
    email: Yup.string(),
    name: Yup.string().required('Debe ingresar su nombre'),
    surname: Yup.string().required(
      'Debe ingresar sus apellidos',
    ),
    number: Yup.number()
      .integer()
      .required('Debe ingresar su telefono'),
  });

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch(
      actions.doUpdateProfile(
        values.name,
        values.surname,
        values.number,
        this.props.token,
      ),
    );
  };

  initialValues = () => {
    const currentUser = this.props.currentUser;
    return {
      email: currentUser.email,
      name: currentUser.name,
      surname: currentUser.surname,
      number: currentUser.number,
    };
  };

  renderForm() {
    const { saveLoading } = this.props;
    console.log('render desde ProfileForm');
    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onFinish={form.handleSubmit}>
                <ViewFormItem
                  name={'email'}
                  label={'Correo'}
                />

                <InputFormItem
                  name={'name'}
                  label={'Nombres'}
                  autoComplete={'name'}
                  autoFocus
                />

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

                <Form.Item
                  className="form-buttons"
                  {...tailFormItemLayout}
                >
                  <Button
                    loading={saveLoading}
                    type="primary"
                    htmlType="submit"
                    icon="save"
                  >
                    {'Guardar'}
                  </Button>

                  <Button
                    disabled={saveLoading}
                    onClick={form.handleReset}
                    icon="undo"
                  >
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
    return this.renderForm();
  }
}

function select(state) {
  return {
    saveLoading:
      selectors.selectLoadingUpdateProfile(state),
    currentUser: selectors.selectCurrentUser(state),
    token: selectors.selectToken(state),
  };
}

export default connect(select)(ProfileFormPage);
