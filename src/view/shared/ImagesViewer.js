import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'antd';
import ImagesViewerWrapper from 'view/shared/styles/ImagesViewerWrapper';

class ImagesViewer extends Component {
  render() {
    if (!this.props.value || !this.props.value.length) {
      return <p>{'No hay imagen'}</p>;
    }
    console.log('render desde ImagesViewer');
    return (
      <ImagesViewerWrapper>
        <Carousel autoplay vertical effect="fade">
          {this.props.value.map((item) => {
            return (
              <img
                key={item.id}
                src={item.publicUrl}
                alt={item.name}
              />
            );
          })}
        </Carousel>
      </ImagesViewerWrapper>
    );
  }
}

ImagesViewer.propTypes = {
  value: PropTypes.array,
};

export default ImagesViewer;
