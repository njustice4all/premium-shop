import React, { Component } from 'react';
import classNames from 'classnames';

import { Images } from '../../components';
import { Info } from '../../components';
import Address from './Address';

export default class AddShop extends Component {

  state = {
    images: [],
    imagePreviewUrl: [],
    isOpenAddress: false,
    category: '',
    name: '',
    description: '',
    address: {
      zipCode: '',
      roadAddress: '',
      detailAddress: '',
    },
    contact: '',
    openingnHours: '',
    closeDays: '',
    possible: [
      { index: 0, title: '홀', isChecked: false },
      { index: 1, title: '배달', isChecked: false },
      { index: 2, title: '포장', isChecked: false },
      { index: 3, title: '예약', isChecked: false },
      { index: 4, title: '주차', isChecked: false },
    ],
  }

  setStateByKey = (key, value) => {
    this.setState((prevState) => ({ [key]: value }));
  }

  toggleAddress = () => {
    this.setState((prevState) => ({ isOpenAddress: !prevState.isOpenAddress }));
  }

  handleAddress = (data) => {
    this.setState({
      address: { zipCode: data.zonecode, roadAddress: data.address, },
      isOpenAddress: false,
    });
  }

  handleCheck = (index) => {
    const { possible } = this.state;
    const newPossible = Array.from(possible);
    newPossible[index].isChecked = !newPossible[index].isChecked;

    this.setState({ possible: newPossible });
  }

  onImageChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

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

  handleConfirm = () => {
    console.log(this.state);
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
    const { imagePreviewUrl, isOpenAddress, address, possible } = this.state;

    return (
      <div className="container">
        <div
          className={classNames('overlay', { active: isOpenAddress })}
          onClick={this.toggleAddress}
        />
        {isOpenAddress ? <Address handleAddress={this.handleAddress} /> : null}
        <Images
          imagePreviewUrl={imagePreviewUrl}
          renderRowTop={this.renderRowTop}
          renderRowBottom={this.renderRowBottom}
          onImageChange={this.onImageChange}
        />
        <Info
          address={address}
          possible={possible}
          isOpenAddress={isOpenAddress}
          initiate={this.initiate}
          toggleAddress={this.toggleAddress}
          handleCheck={this.handleCheck}
        />
        <div className="franchise__btn__confirm__wrapper">
          <div className="franchise__btn">취소하기</div>
          <div
            className="franchise__btn btn__confirm"
            onClick={() => this.handleConfirm()}
          >
            등록하기
          </div>
        </div>
      </div>
    );
  }
};
