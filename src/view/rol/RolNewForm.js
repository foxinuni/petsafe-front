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
    const { dispatch } = this.props;
    dispatch(actions.doNew());
  }

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    const data = {
      ...values,
    };
    console.log(data);
    data.permNumber =
      (data.permissions?.reduce((acumulator, value) => acumulator + value, 0) ||
        0) + Permissions.self;
    dispatch(actions.doCreate(data, this.props.token));
  };

  initialValues = () => {
    return {
      id: 0,
      name: '',
      Permissions: [],
    };
  };

  render() {
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
                    value: permission.bit,
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
                    {'Eliminar'}
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
    findLoading: selectors.selectFindLoading(state),
    saveLoading: selectors.selectSaveLoading(state),
    role: selectors.selectRol(state),
    token: authSelector.selectToken(state),
  };
}

export default connect(select)(rolEditForm);
