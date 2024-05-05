import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'antd';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
//import actions from 'modules/pet/list/petListActions';
import FilterWrapper, {
  formItemLayout,
} from 'view/shared/styles/FilterWrapper';
import authSelectors from 'authorization/authorizationSelector';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import DatePickerRangeFormItem from 'view/shared/form/items/DatePickerRangeFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';

const intialValues = {};

class PetListFilter extends Component {
  componentWillMount() {
    //obtener razas, usuarios, etc, lo necesario
  }
  componentDidMount() {
    /* const { dispatch } = this.props;
    dispatch(actions.doFetch(null, this.props.token));*/
  }

  handleSubmit = (values) => {
    /*const { dispatch } = this.props;
    dispatch(actions.doFetch(values, this.props.token));*/
  };

  handleReset = (form) => {
    /*form.setValues({});
    const { dispatch } = this.props;
    dispatch(actions.doReset());*/
  };

  render() {
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
                  {this.props.permissionManage && this.props.pemissionUsers && (
                    <Col md={24} lg={12}>
                      <SelectFormItem
                        name={'owner'}
                        label={'Dueño'}
                        layout={formItemLayout}
                        options={[
                          {
                            id: 1,
                            value: 'juandiego',
                            title: 'juandiego',
                            label: 'juandiego',
                          },
                        ]}
                      />
                    </Col>
                  )}
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
                      options={[
                        {
                          id: 5,
                          value: 'cat',
                          title: 'cat',
                          label: 'cat',
                        },
                      ]}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <SelectFormItem
                      name={'size'}
                      label={'Tamaño'}
                      options={[
                        {
                          id: 5,
                          value: 'small',
                          title: 'small',
                          label: 'small',
                        },
                      ]}
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
  }
}

function select(state) {
  return {
    token: authSelectors.selectToken(state),
    permissionManage: authSelectors.selectPermViewPets(state),
    pemissionUsers: authSelectors.selectPermViewProfiles(state),
  };
}

export default withRouter(connect(select)(PetListFilter));
