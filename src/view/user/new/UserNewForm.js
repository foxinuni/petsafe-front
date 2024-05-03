import { Button, Form } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/user/form/userFormActions';
import selectors from 'modules/user/form/userFormSelectors';
import model from 'modules/auth/userModel';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImagesFormItem from 'view/shared/form/items/ImagesFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import TagsFormItem from 'view/shared/form/items/TagsFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import FormSchema from 'view/shared/form/formSchema';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import selectorsRoles from 'modules/rol/rolSelectors';
import selectorAuth from 'modules/auth/authSelectors';
import * as Yup from 'yup';
import Password from 'antd/lib/input/Password';

const { fields } = model;

class UserNewForm extends Component {
  schema = Yup.object().shape({
    email: Yup.string(),
    password: Yup.string(),
    name: Yup.string().required('Debe ingresar su nombre'),
    surname: Yup.string().required(
      'Debe ingresar sus apellidos',
    ),
    number: Yup.number()
      .integer()
      .required('Debe ingresar su telefono'),
  });

  initialValues = () => {
    return {
      email: '',
      password: '',
      name: '',
      surname: '',
      number: null,
    };
  };

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(actions.doNew());
  };

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch(actions.doAdd(values, this.props.token));
  };

  isUniqueEmail(form) {
    return (
      !form.values ||
      !form.values.emails ||
      form.values.emails.length <= 1
    );
  }

  render() {
    const { saveLoading } = this.props;
    console.log('render desde hhhhhh');
    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onFinish={form.handleSubmit}>
                <InputFormItem
                  name={'email'}
                  label={'Correo'}
                  required={true}
                  autoFocus
                />
                <InputFormItem
                  name={'password'}
                  label={'Contraseña'}
                  placeholder={'Contraseña'}
                  autoComplete={'password'}
                  required={true}
                  type="password"
                  size="large"
                />
                <InputFormItem
                  name={'name'}
                  label={'Nombre'}
                />
                <InputFormItem
                  name={'surname'}
                  label={'Apellidos'}
                />

                <InputFormItem
                  name={'number'}
                  label={'Numero telefonico'}
                  prefix={'+'}
                />

                <SelectFormItem
                  name={'roles'}
                  label={'Rol'}
                  options={this.props.roles}
                  required={true}
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
}

function select(state) {
  return {
    saveLoading: selectors.selectSaveLoading(state),
    roles: selectorsRoles.selectRoles(state),
    token: selectorAuth.selectToken(state),
  };
}

export default connect(select)(UserNewForm);
