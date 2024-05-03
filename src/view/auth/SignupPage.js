import { Button, Form as AntdForm } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/auth/authActions';
import selectors from 'modules/auth/authSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Content from 'view/auth/styles/Content';
import Logo from 'view/auth/styles/Logo';
import OtherActions from 'view/auth/styles/OtherActions';
import SignupPageWrapper from 'view/auth/styles/SignupPageWrapper';
import InputFormItem, {
  InputFormItemNotFast,
} from 'view/shared/form/items/InputFormItem';
import * as Yup from 'yup';

class SignupPage extends Component {
  schema = Yup.object().shape({
    email: Yup.string()
      .email('Correo electronico invalido')
      .required('Debe ingresar el correo'),
    password: Yup.string()
      .min(
        8,
        'La contraseña debe tener al menos 8 caracteres',
      )
      .required('Debe ingresar la contraseña'),
    name: Yup.string().required(
      'Debe ingresar sus nombres',
    ),
    surname: Yup.string().required(
      'Debe ingresar sus apellidos',
    ),
    number: Yup.number()
      .integer()
      .required('Debe ingresar su telefono'),
  });

  componentDidMount() {
    this.clearErrorMessage();
  }

  handleChange(event, form) {
    if (this.props.errorMessage) {
      this.clearErrorMessage();
    }

    form.handleChange(event);
  }

  clearErrorMessage = () => {
    const { dispatch } = this.props;
    dispatch(actions.doClearErrorMessage());
  };

  initialValues = () => {
    return {
      email: '',
      password: '',
    };
  };

  doSubmit = ({
    email,
    password,
    name,
    surname,
    number,
  }) => {
    const { dispatch } = this.props;
    dispatch(
      actions.doRegisterEmailAndPassword(
        email,
        password,
        name,
        surname,
        number,
      ),
    );
  };

  render() {
    return (
      <SignupPageWrapper
        style={{
          background: `url('URL_DE_TU_IMAGEN') no-repeat center center`,
          backgroundSize: 'cover',
          padding: '40px',
        }}
      >
        <Content
          style={{
            maxWidth: '360px',
            margin: '0 auto',
            background: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Logo style={{ textAlign: 'center' }}>
            <h1 style={{ color: '#1890ff' }}>
              {'Pet safe'}
            </h1>
          </Logo>
          <Formik
            initialValues={this.initialValues()}
            validationSchema={this.schema}
            onSubmit={this.doSubmit}
            render={(form) => (
              <AntdForm onFinish={form.handleSubmit}>
                <InputFormItemNotFast
                  name={'email'}
                  placeholder={'Correo'}
                  autoComplete={'email'}
                  size="large"
                  autoFocus
                  errorMessage={this.props.errorMessage}
                  layout={null}
                  form={form}
                />

                <InputFormItem
                  name={'password'}
                  placeholder={'Contraseña'}
                  autoComplete={'password'}
                  type="password"
                  size="large"
                  layout={null}
                />
                <InputFormItemNotFast
                  name={'name'}
                  placeholder={'Nombres'}
                  autoComplete={'name'}
                  autoFocus
                  errorMessage={this.props.errorMessage}
                  size="large"
                  layout={null}
                  form={form}
                />
                <InputFormItemNotFast
                  name={'surname'}
                  placeholder={'Apellidos'}
                  autoComplete={'surname'}
                  autoFocus
                  errorMessage={this.props.errorMessage}
                  size="large"
                  layout={null}
                  form={form}
                />
                <InputFormItemNotFast
                  name={'number'}
                  placeholder={'Numero telefonico'}
                  autoComplete={'number'}
                  autoFocus
                  errorMessage={this.props.errorMessage}
                  prefix={'+'}
                  size="large"
                  layout={null}
                  form={form}
                />

                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={this.props.loading}
                  style={{ marginTop: '12px' }}
                >
                  {'Registrar'}
                </Button>

                <OtherActions
                  style={{
                    marginTop: '12px',
                    textAlign: 'center',
                  }}
                >
                  <Link to="/auth/signin">
                    {'Ya tengo cuenta'}
                  </Link>
                </OtherActions>
              </AntdForm>
            )}
          />
        </Content>
      </SignupPageWrapper>
    );
  }
}

const select = (state) => ({
  loading: selectors.selectLoading(state),
  errorMessage: selectors.selectErrorMessage(state),
});

export default connect(select)(SignupPage);
