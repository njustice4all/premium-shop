import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { popSelector } from '../actions';

import { isAndroid } from '../utils';

type Props = {
  images: Array<Object>,
  onImageChange: Function,
  validateClass: Function,
  deleteImageByIndex: Function,
  shopSequence: any,
};

class Images extends Component {
  componentDidMount = () => {
    document.addEventListener('message', this.onMessage);
  };

  componentWillUnmount = () => {
    document.removeEventListener('message', this.onMessage);
  };

  onMessage = (event: any) => {
    // this.setState(prevState => ({
    //   images: [...prevState.images, event.data],
    // }));
    this.props.addBase64Images(event.data);
  };

  goCameraActivity = () => {
    window.postMessage(window.navigator.userAgent);
  };

  onSelectorButtonPress = type => () => {
    if (type === 'camera') {
      window.postMessage('camera');
    } else {
      window.postMessage('library');
    }
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
        <label htmlFor="upload-image" onClick={() => this.props.popSelector()}>
          <h1>+</h1>
        </label>
      </div>
    );

    const AddImageButtonForIOS = () => (
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

    const Selector = () => (
      <div className="selector-container" onClick={() => this.props.popSelector()}>
        <div className="selector-wrapper">
          <div className="selector-contents" onClick={this.onSelectorButtonPress('camera')}>
            사진찍어 올리기
          </div>
          <div className="selector-contents" onClick={this.onSelectorButtonPress('library')}>
            라이브러리에서 검색
          </div>
        </div>
      </div>
    );

    return (
      <div className="items" style={{ marginBottom: '0px', padding: '5px 8px' }}>
        <h5 className={classNames('title__big', { wrong: validateClass('images') })}>
          가맹점 이미지
        </h5>
        <div className="image__wrapper" style={{ marginTop: '10px' }}>
          {isAndroid() ? <AddImageButton /> : <AddImageButtonForIOS />}
          {this.props.ui.get('selector') ? <Selector /> : null}
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

export default connect(
  state => ({ ui: state.get('ui') }),
  dispatch => ({ popSelector: () => dispatch(popSelector()) })
)(Images);
