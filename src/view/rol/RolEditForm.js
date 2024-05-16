import React, { Component } from 'react';
import actions from 'modules/rol/rolActions';
import selectors from 'modules/rol/rolSelectors';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import { Button, Form } from 'antd';
import { Formik } from 'formik';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import Permissions from 'authorization/permissions';
import { connect } from 'react-redux';
import authSelector from 'authorization/authorizationSelector';

class rolEditForm extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id, this.props.token));
  }

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    const data = {
      ...values,
    };
    dispatch(actions.doUpdate(data, Permissions.self, this.props.token));
  };

  initialValues = () => {
    const role = this.props.role;
    role.permissions = Permissions.asArray
      .filter((value) => role.permissions == 1 || role.permissions & value.bit)
      .map((value) => ({
        value: value.bit + (value.prereq ?? 0),
        tittle: value.label,
        id: 0,
        label: value.label,
      }));
    return role;
  };

  renderForm() {
    const { saveLoading } = this.props;
    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onFinish={form.handleSubmit}>
                <InputFormItem name={'rolName'} label={'Nombre del rol'} />
                <SelectFormItem
                  name={'permissions'}
                  label={'Permisos'}
                  options={Permissions.asArray.map((permission) => ({
                    id: 0,
                    value: permission.bit + (permission.prereq ?? 0),
                    label: permission.label,
                    tittle: permission.label,
                  }))}
                  mode={'multiple'}
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
    const { findLoading, role } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (!role) {
      return null;
    }

    return this.renderForm();
  }
}

function select(state) {
  return {
    findLoading: selectors.selectFindLoading(state),
    saveLoading: selectors.selectSaveLoading(state),
    role: selectors.selectRol(state),
    token: authSelector.selectToken(state),
  };
}

export default connect(select)(rolEditForm);
