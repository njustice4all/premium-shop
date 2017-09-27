// @flow

import React, { Component } from 'react';
import classNames from 'classnames';

type Props = {
  images: Array<Object>,
  onImageChange: Function,
  validateClass: Function,
};

export default class Images extends Component<Props> {
  render() {
    const { images, onImageChange, validateClass }: Props = this.props;
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
          onChange={e => onImageChange(e)}
        />
      </div>
    );

    return (
      <div className="items" style={{ marginBottom: '0px' }}>
        <h5 className={classNames('title__big', { wrong: validateClass('images') })}>가맹점 이미지</h5>
        <div className="image__wrapper">
          {images.map((value, i) => (
            <div className="images" key={`images-${i}`}>
              <img src={value.image} alt="" />
            </div>
          ))}
          {button}
        </div>
      </div>
    );
  }
}
