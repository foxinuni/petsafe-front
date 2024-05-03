import {
  Button,
  Divider,
  Form as AntdForm,
  Spin,
} from 'antd';
import { Formik } from 'formik';
import actions from 'modules/auth/authActions';
import selectors from 'modules/auth/authSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Content from 'view/auth/styles/Content';
import Logo from 'view/auth/styles/Logo';
import OtherActions from 'view/auth/styles/OtherActions';
import SigninPageWrapper from 'view/auth/styles/SigninPageWrapper';
import InputFormItem, {
  InputFormItemNotFast,
} from 'view/shared/form/items/InputFormItem';
import * as Yup from 'yup';

class SigninPage extends Component {
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
    return { email: '', password: '', rememberMe: true };
  };

  doSubmit = ({ email, password }) => {
    const { dispatch } = this.props;
    dispatch(
      actions.doSigninWithEmailAndPassword(email, password),
    );
  };

  render() {
    console.log('renderizandi');
    return (
      <SigninPageWrapper
        style={{
          paddingTop: '40px',
          paddingBottom: '40px',
        }}
      >
        <Content
          style={{
            maxWidth: '360px',
            margin: '0 auto',
            background: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <Logo style={{ textAlign: 'center' }}>
            <h1 style={{ color: '#1890ff' }}>
              {'Pet safe'}
            </h1>
          </Logo>
          <Divider>Ingresar</Divider>
          <Formik
            initialValues={this.initialValues()}
            validationSchema={this.schema}
            onSubmit={this.doSubmit}
            render={(form) => (
              <AntdForm onFinish={form.handleSubmit}>
                <InputFormItemNotFast
                  name={'email'}
                  placeholder={'Correo'}
                  autoComplete={'Email'}
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

                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={this.props.loading}
                  style={{ marginTop: '12px' }}
                >
                  {'Ingresar'}
                </Button>
                <Spin
                  spinning={this.props.loading}
                  indicator={<div />}
                ></Spin>

                <OtherActions
                  style={{
                    marginTop: '12px',
                    textAlign: 'center',
                  }}
                >
                  <Link to="/auth/signup">
                    {'Registrarse'}
                  </Link>
                </OtherActions>
              </AntdForm>
            )}
          />
        </Content>
      </SigninPageWrapper>
    );
  }
}

const select = (state) => ({
  loading: selectors.selectLoading(state),
  errorMessage: selectors.selectErrorMessage(state),
});

export default connect(select)(SigninPage);
