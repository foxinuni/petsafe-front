import { Button, Col, Form, Row } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/booking/list/bookingListActions';
import selectors from 'modules/booking/list/bookingListSelectors';
import model from 'modules/booking/bookingModel';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilterWrapper, {
  formItemLayout,
} from 'view/shared/styles/FilterWrapper';
import FormFilterSchema from 'view/shared/form/formFilterSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import DatePickerRangeFormItem from 'view/shared/form/items/DatePickerRangeFormItem';
import InputRangeFormItem from 'view/shared/form/items/InputRangeFormItem';
import UserAutocompleteFormItem from 'view/user/autocomplete/UserAutocompleteFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import PetAutocompleteFormItem from 'view/pet/autocomplete/PetAutocompleteFormItem';

const { fields } = model;

const schema = new FormFilterSchema([
  fields.id,
  fields.owner,
  fields.pet,
  fields.arrivalRange,
  fields.departureRange,
  fields.status,
  fields.feeRange,
  fields.createdAtRange,
]);

class BookingListFilter extends Component {
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
    console.log('render desde bookingListFilter');
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
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.id.name}
                      label={fields.id.label}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <DatePickerRangeFormItem
                      name={fields.createdAtRange.name}
                      label={fields.createdAtRange.label}
                      layout={formItemLayout}
                      showTime
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <UserAutocompleteFormItem
                      name={fields.owner.name}
                      label={fields.owner.label}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <PetAutocompleteFormItem
                      name={fields.pet.name}
                      label={fields.pet.label}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <DatePickerRangeFormItem
                      name={fields.arrivalRange.name}
                      label={fields.arrivalRange.label}
                      layout={formItemLayout}
                      showTime
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <DatePickerRangeFormItem
                      name={fields.departureRange.name}
                      label={fields.departureRange.label}
                      layout={formItemLayout}
                      showTime
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <SelectFormItem
                      name={fields.status.name}
                      label={fields.status.label}
                      options={[
                        {
                          id: 1,
                          value: 'activo',
                          label: 'activo',
                          title: 'activo',
                        },
                      ]}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputRangeFormItem
                      name={fields.feeRange.name}
                      label={fields.feeRange.label}
                      layout={formItemLayout}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="filter-buttons" span={24}>
                    <Button
                      loading={loading}
                      icon="search"
                      type="primary"
                      htmlType="submit"
                    >
                      {'Guardar'}
                    </Button>
                    <Button
                      loading={loading}
                      onClick={() => this.handleReset(form)}
                      icon="undo"
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

export default withRouter(
  connect(select)(BookingListFilter),
);
