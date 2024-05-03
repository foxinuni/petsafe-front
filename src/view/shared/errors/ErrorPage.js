import { Button } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ErrorWrapper from 'view/shared/errors/styles/ErrorWrapper';
import selector from 'modules/error/errorSelector';

class ErrorPage extends Component {
  render() {
    if (this.props.errorMessage && this.props.errorCode) {
      return (
        <ErrorWrapper>
          <div className="exception">
            <div className="imgBlock">
              <div
                className="imgEle"
                style={{
                  backgroundImage: `url(/images/error.png)`,
                }}
              />
            </div>
            <div className="content">
              <h1>{`${this.props.errorCode}`}</h1>
              <div className="desc">{this.props.errorMessage}</div>
              <div className="actions">
                <Link to="/">
                  <Button type="primary">{'Regresar'}</Button>
                </Link>
              </div>
            </div>
          </div>
        </ErrorWrapper>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const select = (state) => ({
  errorMessage: selector.selectMessage(state),
  errorCode: selector.selectCode(state),
});

export default connect(select)(ErrorPage);
