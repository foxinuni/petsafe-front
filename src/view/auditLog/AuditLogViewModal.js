import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import JsonHighlighter from 'view/shared/JsonHighlighter';

class AuditLogViewModal extends Component {
  render() {
    if (!this.props.visible) {
      return null;
    }
    console.log('render desde auditlogviewmodal');
    return (
      <Modal
        title={'Logs'}
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        footer={false}
      ></Modal>
    );
  }

  //antes iba    <JsonHighlighter code={this.props.code} /> entre <Modal> </Modal>
}

AuditLogViewModal.propTypes = {
  visible: PropTypes.bool,
  code: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
};

export default AuditLogViewModal;
