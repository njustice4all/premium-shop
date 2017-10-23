// @flow

import React, { Component } from 'react';
import classNames from 'classnames';

type Props = {
  images: Array<Object>,
  onImageChange: Function,
  validateClass: Function,
  deleteImageByIndex: Function,
  editMode: Boolean,
};

export default class Images extends Component<Props> {
  render() {
    const {
      images,
      editMode,
      onImageChange,
      validateClass,
      deleteImageByIndex,
    }: Props = this.props;
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
          {button}
          {images.map((image, index) => (
            <div className="images" key={`images-${index}`} onClick={deleteImageByIndex(index)}>
              <img src={image.get('image')} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
