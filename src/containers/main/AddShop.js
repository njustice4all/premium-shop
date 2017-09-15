import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { initAddShop } from '../../actions';
import isLogged from '../../utils';

import { Images, Info, Buttons, Loading } from '../../components';
import Address from './Address';

class AddShop extends Component {
  state = {
    images: [],
    isOpenAddress: false,
    category: '',
    name: '',
    description: '',
    address: {
      zipCode: '',
      firstAddress: '',
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
    errors: [],
  };

  setStateByKey = (key, value) => {
    this.setState(prevState => ({ [key]: value }));
  };

  toggleAddress = () => {
    this.setState(prevState => ({ isOpenAddress: !prevState.isOpenAddress }));
  };

  handleAddress = data => {
    const { address } = this.state;
    const newAddress = Object.assign({}, address);
    newAddress.zipCode = data.zonecode;
    newAddress.firstAddress = data.address;

    this.setState({ address: newAddress, isOpenAddress: false });
  };

  handleDetailAddress = value => {
    const { address } = this.state;
    const newAddress = Object.assign({}, address);
    newAddress.detailAddress = value;

    this.setState({ address: newAddress });
  };

  handleCategory = value => {
    this.setState({ category: value });
  };

  handleCheck = index => {
    const { possible } = this.state;
    const newPossible = Array.from(possible);
    newPossible[index].isChecked = !newPossible[index].isChecked;

    this.setState({ possible: newPossible });
  };

  onImageChange = e => {
    e.preventDefault();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState(prevState => ({
          images: [
            ...prevState.images,
            {
              image: reader.result,
              imageName: files[i].name,
              imageType: files[i].type,
            },
          ],
        }));
      };

      reader.readAsDataURL(files[i]);
    }
  };

  validateClass = name => (this.state.errors.includes(name) ? true : false);

  handleConfirm = () => {
    const {
      images,
      category,
      name,
      description,
      address,
      contact,
      openingHours,
      closeDays,
      possible,
    } = this.state;
    const { initAddShop, history } = this.props;
    const newPossible = [];
    for (let i = 0; i < possible.length; i++) {
      if (possible[i].isChecked) newPossible.push(possible[i]);
    }

    const validateText = text => (text.trim().length > 0 ? true : false);

    const errors = [];
    if (images.length === 0) errors.push('images');
    if (!validateText(category)) errors.push('category');
    if (!validateText(name)) errors.push('name');
    if (!validateText(description)) errors.push('description');
    if (!validateText(address.zipCode)) errors.push('address');
    if (!validateText(contact)) errors.push('contact');
    if (!validateText(openingHours)) errors.push('openingHours');
    if (!validateText(closeDays)) errors.push('closeDays');
    if (newPossible.length === 0) errors.push('possible');

    this.setState({ errors: errors });

    console.log(this.props.authentication);

    if (errors.length === 0) {
      initAddShop({
        images,
        category,
        name,
        description,
        address,
        contact,
        openingHours,
        closeDays,
        possible: newPossible,
      }).then(value => history.push('/franchise/addProducts'));
    } else {
      console.log('validate');
    }
  };

  render() {
    if (!isLogged()) return <Redirect to="/" />;

    const { images, isOpenAddress, address, possible, description, category, errors } = this.state;

    return (
      <div className="container">
        {this.props.franchise.status.isFetching ? <Loading /> : null}
        <div
          className={classNames('overlay', { active: isOpenAddress })}
          onClick={this.toggleAddress}
        />
        {isOpenAddress ? <Address handleAddress={this.handleAddress} /> : null}
        <Images
          images={images}
          onImageChange={this.onImageChange}
          validateClass={this.validateClass}
        />
        <Info
          address={address}
          possible={possible}
          isOpenAddress={isOpenAddress}
          description={description}
          category={category}
          initiate={this.initiate}
          toggleAddress={this.toggleAddress}
          handleCheck={this.handleCheck}
          setStateByKey={this.setStateByKey}
          handleDetailAddress={this.handleDetailAddress}
          handleCategory={this.handleCategory}
          validateClass={this.validateClass}
        />
        <Buttons handleConfirm={this.handleConfirm} errors={errors.length > 0 ? true : false} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
    franchise: state.franchise,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initAddShop: shop => dispatch(initAddShop(shop)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddShop);
