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

const { fields } = model;

class UserNewForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.email,
    fields.password,
    fields.firstName,
    fields.lastName,
    fields.phoneNumber,
    fields.avatarsIam,
  ]);

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
    console.log('render desde IamNewForm');
    return (
      <FormWrapper>
        <Formik
          initialValues={this.schema.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onFinish={form.handleSubmit}>
                <InputFormItem
                  name={fields.email.name}
                  label={fields.email.label}
                  required={true}
                  autoFocus
                />

                {this.isUniqueEmail(form) && (
                  <React.Fragment>
                    <InputFormItem
                      name={fields.password.name}
                      label={fields.password.label}
                      placeholder={fields.password.label}
                      autoComplete={fields.password.name}
                      required={true}
                      type="password"
                      size="large"
                    />
                    <InputFormItem
                      name={fields.firstName.name}
                      label={fields.firstName.label}
                    />
                    <InputFormItem
                      name={fields.lastName.name}
                      label={fields.lastName.label}
                    />

                    <InputFormItem
                      name={fields.phoneNumber.name}
                      label={fields.phoneNumber.label}
                      prefix={'+'}
                    />

                    <ImagesFormItem
                      name={fields.avatarsIam.name}
                      label={fields.avatarsIam.label}
                      path={fields.avatarsIam.path}
                      schema={{
                        size: fields.avatarsIam.size,
                      }}
                      max={fields.avatarsIam.max}
                    />
                  </React.Fragment>
                )}

                <SelectFormItem
                  name={fields.roles.name}
                  label={fields.roles.label}
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
