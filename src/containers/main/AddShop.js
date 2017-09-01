import React, { Component } from 'react';

import { Images } from '../../components';
import { Info } from '../../components';

export default class AddShop extends Component {

  state = { images: [], imagePreviewUrl: [] }

  handleChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState((prevState) => {
        return {
          images: [...prevState.images, file],
          imagePreviewUrl: [...prevState.imagePreviewUrl, reader.result]
        };
      });
    };

    reader.readAsDataURL(file);
  }

  renderRowTop = (imagePreviewUrl) => {
    const topArray = [];
    let imageLength = imagePreviewUrl.length > 4 ? 4 : imagePreviewUrl.length;

    for (let i = 0; i < imageLength; i++) {
      topArray.push(imagePreviewUrl[i]);
    }

    return topArray.map((value, i) => {
      return (
        <div className="images" key={`images-${i}`}>
          <img src={value} alt='' />
        </div>
      );
    });
  }

  renderRowBottom = (imagePreviewUrl) => {
    const bottomArray = [];
    for (let i = 4; i < imagePreviewUrl.length; i++) {
      bottomArray.push(imagePreviewUrl[i]);
    }

    return bottomArray.map((value, i) => {
      return (
        <div className="images" key={`images-${i}`}>
          <img src={value} alt='' />
        </div>
      );
    });
  }

  render() {
    const { imagePreviewUrl } = this.state;

    return (
      <div className="container">
        <Images
          imagePreviewUrl={imagePreviewUrl}
          renderRowTop={this.renderRowTop}
          renderRowBottom={this.renderRowBottom}
          handleChange={this.handleChange}
        />
        <Info />
      </div>
    );
  }
};
