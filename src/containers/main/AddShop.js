import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Map, List } from 'immutable';

import { initAddShop } from '../../actions';

import { Images, Info, Buttons, Loading, Address } from '../../components';

class AddShop extends Component {
  state = {
    images: List([]),
    isOpenAddress: false,
    category: '',
    name: '',
    description: '',
    address: Map({
      zipCode: '',
      firstAddress: '',
      detailAddress: '',
    }),
    contact: '',
    openingHours: '',
    closeDays: '',
    possible: List([
      Map({ index: 0, title: '홀', isChecked: false, src: '/img/icon01' }),
      Map({ index: 1, title: '배달', isChecked: false, src: '/img/icon02' }),
      Map({ index: 2, title: '포장', isChecked: false, src: '/img/icon03' }),
      Map({ index: 3, title: '예약', isChecked: false, src: '/img/icon04' }),
      Map({ index: 4, title: '주차', isChecked: false, src: '/img/icon05' }),
    ]),
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
    this.setState({
      address: address.merge({ zipCode: data.zonecode, firstAddress: data.address }),
      isOpenAddress: false,
    });
  };

  handleDetailAddress = value => {
    const { address } = this.state;
    this.setState({ address: address.set('detailAddress', value) });
  };

  handleCategory = value => {
    this.setState({ category: value });
  };

  handleCheck = index => {
    const { possible } = this.state;
    this.setState({
      possible: possible.update(index, item => item.set('isChecked', !item.get('isChecked'))),
    });
  };

  onImageChange = e => {
    e.preventDefault();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          images: this.state.images.push(
            Map({
              image: reader.result,
              imageName: files[i].name,
              imageType: files[i].type,
            })
          ),
        });
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
    const { initAddShop, history, authentication } = this.props;
    let newPossible = List([]);
    for (let i = 0; i < possible.size; i++) {
      if (possible.get(i).get('isChecked')) {
        newPossible = newPossible.push(possible.get(i));
      }
    }

    const validateText = text => (text.trim().length > 0 ? true : false);

    const errors = [];
    if (images.size === 0) errors.push('images');
    if (!validateText(category)) errors.push('category');
    if (!validateText(name)) errors.push('name');
    if (!validateText(description)) errors.push('description');
    if (!validateText(address.get('zipCode'))) errors.push('address');
    if (!validateText(contact)) errors.push('contact');
    if (!validateText(openingHours)) errors.push('openingHours');
    if (!validateText(closeDays)) errors.push('closeDays');
    if (newPossible.size === 0) errors.push('possible');

    this.setState({ errors: errors });

    if (errors.length === 0) {
      initAddShop({
        images: images.toJS(),
        category,
        name,
        description,
        address: address.toJS(),
        contact,
        openingHours,
        closeDays,
        possible: newPossible.toJS(),
        member_seq: authentication.get('seq'),
      }).then(value => history.push('/franchise/addProducts'));
    } else {
      console.log('validate');
    }
  };

  render() {
    const { authentication, franchise } = this.props;
    const { images, isOpenAddress, address, possible, description, category, errors } = this.state;

    if (!authentication.get('isLogin')) {
      return <Redirect to="/auth/signin" />;
    }

    return (
      <div>
        <div className="container">
          {franchise.getIn(['status', 'isFetching']) ? <Loading /> : null}
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
          <div className="divider">
            <div />
          </div>
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
        </div>
        <Buttons handleConfirm={this.handleConfirm} errors={errors.length > 0 ? true : false} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.get('authentication'),
  franchise: state.get('franchise'),
});

const mapDispatchToProps = dispatch => ({
  initAddShop: shop => dispatch(initAddShop(shop)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddShop);
