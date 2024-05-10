import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'antd';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import actions from 'modules/pet/petListActions';
import FilterWrapper, {
  formItemLayout,
} from 'view/shared/styles/FilterWrapper';
import authSelectors from 'authorization/authorizationSelector';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import DatePickerRangeFormItem from 'view/shared/form/items/DatePickerRangeFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import petActions from 'modules/pet/form/petFormActions';
import petSelectors from 'modules/pet/form/petFormSelectors';
import selectorAuth from 'modules/auth/authSelectors';

const intialValues = {};

class PetListFilter extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    if (this.props.pemissionUsers) {
      dispatch(petActions.getAllUsers(this.props.token));
    }
    dispatch(petActions.getAllTypes(this.props.token));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(
      actions.doFetch({ me: !this.props.permissionView }, this.props.token),
    );
  }

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    if (!this.props.permissionView) values.me = true;
    dispatch(actions.doFetch(values, this.props.token));
  };

  handleReset = (form) => {
    form.setValues({});
    const { dispatch } = this.props;
    dispatch(actions.doReset());
  };

  render() {
    if (this.props.types) {
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
                      <InputFormItem
                        name={'name'}
                        label={'Nombre'}
                        layout={formItemLayout}
                      />
                    </Col>
                    <Col md={24} lg={12}>
                      <DatePickerRangeFormItem
                        name={'createdAt'}
                        label={'Creado'}
                        layout={formItemLayout}
                      />
                    </Col>
                    {this.props.permissionView && this.props.pemissionUsers && (
                      <Col md={24} lg={12}>
                        <SelectFormItem
                          name={'owner'}
                          label={'Dueño'}
                          layout={formItemLayout}
                          options={this.props.users.rows.map((user) => ({
                            id: user.id,
                            value: user.id,
                            title: user.name,
                            label: user.name,
                          }))}
                        />
                      </Col>
                    )}
                    <Col md={24} lg={12}>
                      <SelectFormItem
                        name={'state'}
                        label={'Estado'}
                        layout={formItemLayout}
                        options={[
                          {
                            id: '7e68b58b-9a70-49b9-be76-4062cf9ed39d',
                            label: 'Vivo',
                            value: '7e68b58b-9a70-49b9-be76-4062cf9ed39d',
                            title: 'Vivo',
                          },
                          {
                            id: 'fa6e2e74-c0a7-496c-a1ae-05f80b72818d	',
                            label: 'Muerto',
                            value: 'fa6e2e74-c0a7-496c-a1ae-05f80b72818d	',
                            title: 'Muerto',
                          },
                        ]}
                      />
                    </Col>
                    <Col md={24} lg={12}>
                      <InputFormItem
                        name={'age'}
                        label={'Edad'}
                        layout={formItemLayout}
                      />
                    </Col>
                    <Col md={24} lg={12}>
                      <SelectFormItem
                        name={'type'}
                        label={'Tipo'}
                        options={this.props.types.map((type) => ({
                          id: type.id,
                          value: type.id,
                          label: type.name,
                          title: type.name,
                        }))}
                        layout={formItemLayout}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      span={24}
                      style={{
                        textAlign: 'right',
                        marginTop: '20px',
                      }}
                    >
                      <Button
                        loading={loading}
                        icon={<SearchOutlined />}
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: '10px' }}
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
    token: authSelectors.selectToken(state),
    types: petSelectors.selectTypes(state),
    users: petSelectors.selectUsers(state),
    permissionView: authSelectors.selectPermViewPets(state),
    pemissionUsers: authSelectors.selectPermViewProfiles(state),
    currentUser: selectorAuth.selectCurrentUser(state),
  };
}

export default withRouter(connect(select)(PetListFilter));
