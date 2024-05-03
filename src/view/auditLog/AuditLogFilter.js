import { Button, Col, Form, Row } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/auditLog/auditLogActions';
import model from 'modules/auditLog/auditLogModel';
import selectors from 'modules/auditLog/auditLogSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DatePickerRangeFormItem from 'view/shared/form/items/DatePickerRangeFormItem';
import TagsFormItem from 'view/shared/form/items/TagsFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import FilterWrapper, {
  formItemLayout,
} from 'view/shared/styles/FilterWrapper';
import FormFilterSchema from 'view/shared/form/formFilterSchema';

const { fields } = model;

const schema = new FormFilterSchema([
  fields.timestampRange,
  fields.entityNames,
  fields.entityId,
  fields.action,
  fields.createdByEmail,
]);

class AuditLogFilter extends Component {
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
    console.log('render desde auditlogfilter');
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
                    <DatePickerRangeFormItem
                      name={fields.timestampRange.name}
                      label={fields.timestampRange.label}
                      re
                      layout={formItemLayout}
                      showTime
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.createdByEmail.name}
                      label={fields.createdByEmail.label}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.entityId.name}
                      label={fields.entityId.label}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.action.name}
                      label={fields.action.label}
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
                      {'Buscar'}
                    </Button>
                    <Button
                      loading={loading}
                      onClick={() => this.handleReset(form)}
                      icon="undo"
                    >
                      {'Resetar'}
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

export default withRouter(connect(select)(AuditLogFilter));
