import { Button, Col, Form, Row } from 'antd';
import { Formik } from 'formik';
import selectorsRoles from 'modules/rol/rolSelectors';
import authSelectors from 'authorization/authorizationSelector';
import actions from 'modules/user/userListActions';
import actionsRoles from 'modules/rol/rolActions';
import React, { Component } from 'react';
import { SearchOutlined } from '@ant-design/icons';
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
    const { dispatch } = this.props;
    dispatch(actions.doFetch(values, this.props.token));
  };

  handleReset = (form) => {
    form.setValues({});
    const { dispatch } = this.props;
    dispatch(actions.doReset(this.props.token));
  };

  render() {
    if (this.props.roles) {
      const { loading } = this.props;
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
                        name={'name'}
                        label={'Nombre'}
                        layout={formItemLayout}
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
                        icon={<SearchOutlined />}
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
    roles: selectorsRoles.selectRoles(state),
    token: authSelectors.selectToken(state),
  };
}

export default withRouter(connect(select)(UserUsersFilter));
