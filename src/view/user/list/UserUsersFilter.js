import { Button, Col, Form, Row } from 'antd';
import { Formik } from 'formik';
import selectorsRoles from 'modules/rol/rolSelectors';
import selectorAuth from 'modules/auth/authSelectors';
import actions from 'modules/user/list/userListActions';
import actionsRoles from 'modules/rol/rolActions';
import selectors from 'modules/user/list/userListSelectors';
import model from 'modules/auth/userModel';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import FilterWrapper, {
  formItemLayout,
} from 'view/shared/styles/FilterWrapper';
import DatePickerRangeFormItem from 'view/shared/form/items/DatePickerRangeFormItem';

const { fields } = model;

const intialValues = {};

class UserUsersFilter extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actionsRoles.getAllRoles(this.props.token));
    console.log('roles encontrados');
    console.log(this.props.roles);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.doFetch(null, this.props.token));
  }

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch(actions.doFetch(values, this.props.token));
  };

  handleReset = (form) => {
    form.setValues({});
    const { dispatch } = this.props;
    dispatch(actions.doReset());
  };

  render() {
    if (this.props.roles) {
      const { loading } = this.props;
      console.log('render desde IamUsersFilter');
      return (
        <FilterWrapper
          style={{
            padding: '20px',
            background: '#f0f2f5',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Formik
            initialValues={intialValues}
            onSubmit={this.handleSubmit}
            render={(form) => {
              return (
                <Form
                  onFinish={form.handleSubmit}
                  layout="vertical"
                >
                  <Row gutter={24}>
                    <Col md={24} lg={12}>
                      <DatePickerRangeFormItem
                        name={fields.createdAtRange.name}
                        label={fields.createdAtRange.label}
                        layout={formItemLayout}
                        showTime
                      />
                    </Col>
                    <Col md={24} lg={12}>
                      <InputFormItem
                        name={fields.email.name}
                        label={fields.email.label}
                        layout={formItemLayout}
                      />
                    </Col>
                    <Col md={24} lg={12}>
                      <InputFormItem
                        name={fields.firstName.name}
                        label={fields.firstName.label}
                        layout={formItemLayout}
                      />
                    </Col>
                    <Col md={24} lg={12}>
                      <InputFormItem
                        name={fields.lastName.name}
                        label={fields.lastName.label}
                        layout={formItemLayout}
                      />
                    </Col>
                    <Col md={24} lg={12}>
                      <SelectFormItem
                        name={fields.status.name}
                        label={fields.status.label}
                        layout={formItemLayout}
                        options={fields.status.options.map(
                          (item) => ({
                            value: item.id,
                            label: item.label,
                          }),
                        )}
                      />
                    </Col>
                    <Col md={24} lg={12}>
                      <SelectFormItem
                        name={fields.role.name}
                        label={'Roles'}
                        options={this.props.roles.map(
                          (rol) => ({
                            value: rol.id,
                            title: rol.name,
                            label: rol.name,
                          }),
                        )}
                        layout={formItemLayout}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      className="filter-buttons"
                      span={24}
                    >
                      <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                      >
                        {'Buscar'}
                      </Button>
                      <Button
                        loading={loading}
                        onClick={() =>
                          this.handleReset(form)
                        }
                      >
                        {'Resetear'}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          />
        </FilterWrapper>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

function select(state) {
  return {
    filter: selectors.selectFilter(state),
    roles: selectorsRoles.selectRoles(state),
    token: selectorAuth.selectToken(state),
  };
}

export default withRouter(connect(select)(UserUsersFilter));
