import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'antd';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import actions from 'modules/pet/list/petListActions';
import selectors from 'modules/pet/list/petListSelectors';
import model from 'modules/pet/petModel';
import FilterWrapper from 'view/shared/styles/FilterWrapper';
import FormFilterSchema from 'view/shared/form/formFilterSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import DatePickerRangeFormItem from 'view/shared/form/items/DatePickerRangeFormItem';
import UserAutocompleteFormItem from 'view/user/autocomplete/UserAutocompleteFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';

const { fields } = model;

const schema = new FormFilterSchema([
  fields.id,
  fields.owner,
  fields.name,
  fields.type,
  fields.breed,
  fields.size,
  fields.createdAtRange,
]);

class PetListFilter extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.doFetch(this.initialFilter()));
  }

  initialFilter = () => {
    return schema.initialValues(
      this.props.filter,
      this.props.location,
    );
  };

  handleSubmit = (values) => {
    const valuesToSubmit = schema.cast(values);
    const { dispatch } = this.props;
    dispatch(actions.doFetch(valuesToSubmit));
  };

  handleReset = (form) => {
    form.setValues({});
    const { dispatch } = this.props;
    dispatch(actions.doReset());
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
          initialValues={this.initialFilter()}
          validationSchema={schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form
                onFinish={form.handleSubmit}
                layout="vertical"
              >
                <Row gutter={24}>
                  {/** Fields rendering same as above but layout changed to vertical for consistency */}
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.id.name}
                      label={fields.id.label}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <DatePickerRangeFormItem
                      name={fields.createdAtRange.name}
                      label={fields.createdAtRange.label}
                      showTime
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <UserAutocompleteFormItem
                      name={fields.owner.name}
                      label={fields.owner.label}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.name.name}
                      label={fields.name.label}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <SelectFormItem
                      name={fields.type.name}
                      label={fields.type.label}
                      options={[
                        {
                          id: 5,
                          value: 'cat',
                          title: 'cat',
                          label: 'cat',
                        },
                      ]}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.breed.name}
                      label={fields.breed.label}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <SelectFormItem
                      name={fields.size.name}
                      label={fields.size.label}
                      options={[
                        {
                          id: 5,
                          value: 'small',
                          title: 'small',
                          label: 'small',
                        },
                      ]}
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
                      icon={<PlusOutlined />}
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
    filter: selectors.selectFilter(state),
  };
}

export default withRouter(connect(select)(PetListFilter));
