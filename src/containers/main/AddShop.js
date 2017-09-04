import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { initAddShop } from '../../actions';

import { Images } from '../../components';
import { Info } from '../../components';
import Address from './Address';

class AddShop extends Component {

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
    openingHours: '',
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
    const { address } = this.state;
    const newAddress = Object.assign({}, address);
    newAddress.zipCode = data.zonecode;
    newAddress.roadAddress = data.address;

    this.setState({ address: newAddress, isOpenAddress: false, });
  }

  handleDetailAddress = (value) => {
    const { address } = this.state;
    const newAddress = Object.assign({}, address);
    newAddress.detailAddress = value;

    this.setState({ address: newAddress });
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
    const {
      images,
      imagePreviewUrl,
      category,
      name,
      description,
      address,
      contact,
      openingHours,
      closeDays,
      possible,
    } = this.state;
    const { initAddShop } = this.props;
    const newPossible = [];
    for (let i = 0; i < possible.length; i++) {
      if (possible[i].isChecked) newPossible.push(possible[i]);
    }

    const validateLength = (obj) => {
      if (obj.trim().length > 0) {
        return true;
      }
      return false;
    };

    const validate = () => {
      if (
        validateLength(name) &&
        validateLength(description) &&
        validateLength(contact) &&
        validateLength(openingHours) &&
        validateLength(closeDays)
      ) {
        return true;
      }
      return false;
    }

    if (validate()) {
      initAddShop({
        images,
        imagePreviewUrl,
        category,
        name,
        description,
        address,
        contact,
        openingHours,
        closeDays,
        newPossible
      });
    } else {
      console.log('가맹점 정보 양식을 모두 작성해 주세요 popup창');
    }
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
    const { imagePreviewUrl, isOpenAddress, address, possible, description } = this.state;

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
          description={description}
          initiate={this.initiate}
          toggleAddress={this.toggleAddress}
          handleCheck={this.handleCheck}
          setStateByKey={this.setStateByKey}
          handleDetailAddress={this.handleDetailAddress}
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

const mapDispatchToProps = (dispatch) => {
  return {
    initAddShop: (shop) => dispatch(initAddShop(shop))
  };
};

export default connect(undefined, mapDispatchToProps)(AddShop);
