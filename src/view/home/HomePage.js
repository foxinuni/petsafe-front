import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Layout from 'view/layout/Layout';
import { Row, Col, Card } from 'antd';

class HomePage extends PureComponent {
  render() {
    console.log('render desde homepage');
    return null;
  }
}

export default connect(null)(Layout(HomePage));
