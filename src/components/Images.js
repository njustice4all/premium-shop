// @flow

import React, { Component } from 'react';
import classNames from 'classnames';

// import { isAndroid } from '../utils';

type Props = {
  images: Array<Object>,
  onImageChange: Function,
  validateClass: Function,
  deleteImageByIndex: Function,
  shopSequence: any,
};

export default class Images extends Component<Props> {
  componentDidMount = () => {
    document.addEventListener('message', this.onMessage);
  };

  componentWillUnmount = () => {
    document.removeEventListener('message', this.onMessage);
  };

  onMessage = (event: any) => {
    window.alert(event.data);
  };

  goCameraActivity = () => {
    window.postMessage(window.navigator.userAgent);
  };

  render() {
    const {
      images,
      onImageChange,
      validateClass,
      deleteImageByIndex,
      shopSequence,
    }: Props = this.props;

    const AddImageButton = () => (
      <div className="images">
        <label htmlFor="upload-image">
          <h1>+</h1>
        </label>
        <input
          style={{ display: 'none' }}
          id="upload-image"
          multiple
          accept="image/*"
          capture="camera"
          name="photo"
          type="file"
          onChange={e => onImageChange(e)}
        />
      </div>
    );

    return (
      <div className="items" style={{ marginBottom: '0px', padding: '5px 8px' }}>
        <h5 className={classNames('title__big', { wrong: validateClass('images') })}>가맹점 이미지</h5>
        <div className="image__wrapper" style={{ marginTop: '10px' }}>
          <AddImageButton />
          {images.map((image, index) => (
            <div className="images" key={`images-${index}`}>
              <span className="btn-delete" onClick={deleteImageByIndex(index)}>
                <img src="/img/icon06.png" alt="" />
              </span>
              <img
                src={
                  image.get('uniqueId')
                    ? image.get('image')
                    : `http://van.aty.kr/image/${shopSequence}/${image.get('imageName')}`
                }
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
