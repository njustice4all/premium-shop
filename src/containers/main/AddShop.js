import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Map, List } from 'immutable';

import { validateState, createUniqueId, convertUrlToBase64 } from '../../utils';
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
      detailAddress: 'ATY빌딩 401호',
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
    deleteImages: List([]),
    addImages: List([]),
  };

  componentDidMount = () => {
    if (this.props.editMode) this.onEditMode();
  };

  onEditMode = () => {
    const { match, franchiseLists } = this.props;
    const { shopSequence } = match.params;
    const lists = franchiseLists.get('lists');
    const result = lists.filter(shop => shop.seq === shopSequence).get(0);

    if (lists.size === 0) return;

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

    convertUrlToBase64(result.image, onResult => {
      this.setState({
        images: this.state.images.push(
          Map({
            image: onResult.base64,
            imageName: '제목없음',
            imageType: 'image/png',
            seq: onResult.seq,
          })
        ),
      });
    });
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
        const image = Map({
          image: reader.result,
          imageName: files[i].name,
          imageType: files[i].type,
          added: true,
          uniqueId: createUniqueId(),
        });
        this.setState({
          images: this.state.images.push(image),
          addImages: this.state.addImages.push(image),
        });
      };

      reader.readAsDataURL(files[i]);
    }
  };

  deleteImageByIndex = index => () => {
    const deleteImage = this.state.images.get(index);
    let deleteIndexFromAddImages = null;

    if (deleteImage.get('added')) {
      this.state.addImages.forEach((image, index) => {
        if (image.get('uniqueId') === deleteImage.get('uniqueId')) {
          deleteIndexFromAddImages = index;
        }
      });
    }

    this.setState({
      images: this.state.images.delete(index),
      deleteImages: this.state.deleteImages.push(deleteImage.get('seq')),
      addImages: this.state.addImages.delete(deleteIndexFromAddImages),
    });
  };

  validateClass = name => (this.state.errors.includes(name) ? true : false);

  handleConfirm = () => (this.props.editMode ? this.onModifyShop() : this.onAddShop());

  onAddShop = () => {
    const {
      images,
      category,
      name,
      description,
      address,
      contact,
      openingHours,
      closeDays,
    } = this.state;
    const { initAddShop, history, authentication } = this.props;
    const { errors, possible } = validateState(this.state);

    this.setState({ errors: errors });

    if (errors.length === 0) {
      initAddShop({
        images: images.toJS(),
        address: address.toJS(),
        possible: possible.toJS(),
        member_seq: authentication.get('seq'),
        category,
        name,
        description,
        contact,
        openingHours,
        closeDays,
      }).then(value => history.push('/franchise/addProducts'));
    } else {
      console.log('validate');
    }
  };

  onModifyShop = () => {
    const {
      addImages,
      deleteImages,
      category,
      name,
      description,
      address,
      contact,
      openingHours,
      closeDays,
    } = this.state;
    const { initAddShop, history, authentication } = this.props;
    const { errors, possible } = validateState(this.state);

    const result = {
      addImages: addImages.toJS(),
      deleteImages: deleteImages.toJS(),
      seq: this.props.match.params.shopSequence,
      address: address.toJS(),
      possible: possible.toJS(),
      category,
      name,
      description,
      contact,
      openingHours,
      closeDays,
    };

    console.log(result);
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
