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
    category: 'restaurant',
    name: '티바 두마리 치킨 대치점',
    description: '2001년부터 17년간 치킨만을 생각하고 연구해왔으며 가맹점 사장님의 작은 성공에 도움이 되도록 노력하겠습니다.',
    address: Map({
      zipCode: '419328',
      firstAddress: '서울특별시 강남구 대치동',
      detailAddress: 'Adra빌딩 401호',
    }),
    contact: '025551234',
    openingHours: '평일 11:00 ~ 22:00 / 일요일 11:30 ~ 22:30',
    closeDays: '연중무휴',
    possible: List([
      Map({ index: 0, title: '홀', isChecked: true, src: '/img/icon01' }),
      Map({ index: 1, title: '배달', isChecked: true, src: '/img/icon02' }),
      Map({ index: 2, title: '포장', isChecked: true, src: '/img/icon03' }),
      Map({ index: 3, title: '예약', isChecked: true, src: '/img/icon04' }),
      Map({ index: 4, title: '주차', isChecked: false, src: '/img/icon05' }),
    ]),
    errors: [],
  };

  componentDidMount = () => {
    if (this.props.editMode) this.onEditMode();
  };

  onEditMode = () => {
    const { match, franchiseLists } = this.props;
    const { shopSequence } = match.params;
    const lists = franchiseLists.get('lists');
    const result = lists.filter(shop => shop.seq === shopSequence).get(0);

    console.log(lists);

    this.setState({
      category: result.category,
      name: result.name,
      description: result.description,
      address: Map({
        zipCode: result.zipCode,
        firstAddress: result.firstAddress,
        detailAddress: result.detailAddress,
      }),
      contact: result.contact,
      openingHours: result.openingHours,
      closeDays: result.closeDays,
      possible: List([
        Map({
          index: 0,
          title: '홀',
          isChecked: result.possible_0 === '1' ? true : false,
          src: '/img/icon01',
        }),
        Map({
          index: 1,
          title: '배달',
          isChecked: result.possible_1 === '1' ? true : false,
          src: '/img/icon02',
        }),
        Map({
          index: 2,
          title: '포장',
          isChecked: result.possible_2 === '1' ? true : false,
          src: '/img/icon03',
        }),
        Map({
          index: 3,
          title: '예약',
          isChecked: result.possible_3 === '1' ? true : false,
          src: '/img/icon04',
        }),
        Map({
          index: 4,
          title: '주차',
          isChecked: result.possible_4 === '1' ? true : false,
          src: '/img/icon05',
        }),
      ]),
    });

    this.convertBase64(`http://van.aty.kr/image/${result.imageName}`, base64 =>
      this.setState({
        images: this.state.images.push(
          Map({
            image: base64,
            imageName: '제목없음',
            imageType: 'image/png',
          })
        ),
      })
    );
  };

  setStateByKey = (key, value) => this.setState(prevState => ({ [key]: value }));

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

  handleCategory = value => this.setState({ category: value });

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

  deleteImageByIndex = index => () => this.setState({ images: this.state.images.delete(index) });

  convertBase64 = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      var reader = new FileReader();
      reader.onloadend = () => callback(reader.result);
      reader.readAsDataURL(xhr.response);
    };

    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
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
      if (possible.getIn([i, 'isChecked'])) {
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

  handleCancel = () => this.props.history.push('/');

  render() {
    const { authentication, franchise, editMode } = this.props;
    const {
      images,
      isOpenAddress,
      address,
      possible,
      name,
      closeDays,
      description,
      contact,
      openingHours,
      category,
      errors,
    } = this.state;

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
            editMode={editMode}
            onImageChange={this.onImageChange}
            validateClass={this.validateClass}
            deleteImageByIndex={this.deleteImageByIndex}
          />
          <div className="divider">
            <div />
          </div>
          <Info
            address={address}
            possible={possible}
            isOpenAddress={isOpenAddress}
            name={name}
            contact={contact}
            openingHours={openingHours}
            closeDays={closeDays}
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
        <Buttons
          handleConfirm={this.handleConfirm}
          handleCancel={this.handleCancel}
          errors={errors.length > 0 ? true : false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.get('authentication'),
  franchise: state.get('franchise'),
  franchiseLists: state.get('franchiseLists'),
});

const mapDispatchToProps = dispatch => ({
  initAddShop: shop => dispatch(initAddShop(shop)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddShop);
