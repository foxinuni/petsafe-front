import { Button, Col, Form, Row, DatePicker } from 'antd';
import { Formik } from 'formik';
import selectorsRoles from 'modules/rol/rolSelectors';
import selectorAuth from 'modules/auth/authSelectors';
import actions from 'modules/user/list/userListActions';
import actionsRoles from 'modules/rol/rolActions';
import selectors from 'modules/user/list/userListSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import FilterWrapper, {
  formItemLayout,
} from 'view/shared/styles/FilterWrapper';

import DatePickerRangeFormItem from 'view/shared/form/items/DatePickerRangeFormItem';

const intialValues = {};

class UserUsersFilter extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actionsRoles.getAllRoles(this.props.token));
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.doFetch(null, this.props.token));
  }

  handleSubmit = (values) => {
    //convert date range (if there is) to string, because sending it to the state as a moment
    //causes issues
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
      console.log('render desde UsersFilter');
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
                <Form onFinish={form.handleSubmit} layout="vertical">
                  <Row gutter={24}>
                    <Col md={24} lg={12}>
                      <DatePickerRangeFormItem
                        name={'createdAt'}
                        label={'Creado'}
                        layout={formItemLayout}
                      />
                    </Col>
                    <Col md={24} lg={12}>
                      <InputFormItem
                        name={'email'}
                        label={'Correo'}
                        layout={formItemLayout}
                      />
                    </Col>
                    <Col md={24} lg={12}>
                      <InputFormItem
                        name={'fullName'}
                        label={'Nombre'}
                        layout={formItemLayout}
                      />
                    </Col>
                    <Col md={24} lg={12}>
                      <SelectFormItem
                        name={'status'}
                        label={'Estado'}
                        layout={formItemLayout}
                        options={[
                          {
                            id: 1,
                            value: 1,
                            title: 'Activo',
                            label: 'Activo',
                          },
                          {
                            id: 2,
                            value: 0,
                            title: 'Inactivo',
                            label: 'Inactivo',
                          },
                        ]}
                      />
                    </Col>
                    <Col md={24} lg={12}>
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
                        layout={formItemLayout}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="filter-buttons" span={24}>
                      <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                      >
                        {'Buscar'}
                      </Button>
                      <Button
                        loading={loading}
                        onClick={() => this.handleReset(form)}
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
