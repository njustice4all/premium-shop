import React, { Component } from 'react';
import classNames from 'classnames';

export default class Images extends Component {

  render() {
    const { images, onImageChange, validateClass } = this.props;
    const button = (
      <div className="images">
        <label htmlFor="upload-image">
          <h1>+</h1>
        </label>
        <input
          style={{ display: 'none' }}
          id="upload-image"
          multiple
          accept="image/*"
          name="photo"
          type="file"
          onChange={(e) => onImageChange(e)}
        />
      </div>
    );

    return (
      <div className="items">
        <h5 className={classNames('title__big', { wrong: validateClass('images') })}>가맹점 이미지</h5>
        <div className="image__wrapper">
          {images.map((value, i) => (
            <div className="images" key={`images-${i}`}>
              <img src={value.image} alt='' />
            </div>
          ))}
          {button}
        </div>
      </div>
    );
  }
}
