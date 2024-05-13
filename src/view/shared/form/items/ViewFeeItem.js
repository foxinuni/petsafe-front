import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import { FastField } from 'formik';

class ViewFeeItemNotFast extends Component {
  render() {
    const { label, layout, value } = this.props;
    return (
      <Form.Item {...layout} label={label}>
        <strong>{value}</strong>
      </Form.Item>
    );
  }
}

ViewFeeItemNotFast.defaultProps = {
  layout: formItemLayout,
};

ViewFeeItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  layout: PropTypes.object,
};

class ViewFeeItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <ViewFeeItemNotFast {...this.props} form={form} />
        )}
      />
    );
  }
}

export default ViewFeeItem;
