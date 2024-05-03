import React, { Component } from 'react';
import { Spin } from 'antd';

class Spinner extends Component {
  render() {
    console.log('render desde Spinner');
    return (
      <div
        style={{
          width: '100%',
          margin: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin />
      </div>
    );
  }
}

export default Spinner;
