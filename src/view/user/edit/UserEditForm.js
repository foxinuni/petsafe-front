import { Button, Form } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/user/form/userFormActions';
import selectors from 'modules/user/form/userFormSelectors';
import model from 'modules/auth/userModel';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImagesFormItem from 'view/shared/form/items/ImagesFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import FormSchema from 'view/shared/form/formSchema';
import selectorsRoles from 'modules/rol/rolSelectors';
import selectorAuth from 'modules/auth/authSelectors';

const { fields } = model;

class UserEditForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.email,
    fields.firstName,
    fields.lastName,
    fields.phoneNumber,
    fields.avatarsIam,
  ]);

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(
      actions.doFind(match.params.id, this.props.token),
    );
  }

  handleSubmit = (values) => {
    const { dispatch, user } = this.props;
    const data = {
      ...values,
    };
    delete data.email;
    dispatch(
      actions.doUpdate(
        this.props.user.id,
        data,
        this.props.token,
      ),
    );
  };

  initialValues = () => {
    const user = this.props.user;
    user.roles = user.rol;
    return user;
  };

  renderForm() {
    const { saveLoading } = this.props;
    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onFinish={form.handleSubmit}>
                <ViewFormItem
                  name={fields.email.name}
                  label={fields.email.label}
                />

                <InputFormItem
                  name={fields.firstName.name}
                  label={fields.firstName.label}
                  autoFocus
                />

                <InputFormItem
                  name={fields.lastName.name}
                  label={fields.lastName.label}
                  autoComplete={fields.lastName.name}
                />

                <InputFormItem
                  name={fields.phoneNumber.name}
                  label={fields.phoneNumber.label}
                  autoComplete={fields.phoneNumber.name}
                  prefix={'+'}
                />

                <ImagesFormItem
                  name={fields.avatarsIam.name}
                  label={fields.avatarsIam.label}
                  path={fields.avatarsIam.path}
                  // width={fields.avatarsIam.width}
                  // height={fields.avatarsIam.height}
                  schema={{
                    size: fields.avatarsIam.size,
                  }}
                  max={fields.avatarsIam.max}
                />

                <SelectFormItem
                  name={fields.roles.name}
                  label={fields.roles.label}
                  options={this.props.roles}
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
    token: selectorAuth.selectToken(state),
  };
}

export default connect(select)(UserEditForm);
