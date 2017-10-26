import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Map, List } from 'immutable';

import { initAddProducts, initGetProducts } from '../../actions';
import { convertoDataToState, createUniqueId, getModifyProducts } from '../../utils';

import { Product, Buttons, Loading, Popup } from '../../components';

class AddProducts extends Component {
  state = {
    products: List([]),
    deletedProducts: List([]),
    addedProducts: List([]),
  };

  componentDidMount = () => {
    if (this.props.editMode) this.onEditMode();
  };

  onEditMode = () => {
    const { initGetProducts, franchise } = this.props;
    if (!franchise.get('seq')) return;
    initGetProducts(franchise.get('seq')).then(result => {
      this.setState({ products: convertoDataToState(result.data) });
    });
  };

  addProduct = () => {
    const newProduct = Map({
      images: List([]),
      title: '',
      price: 0,
      option: List([]),
      contents: '',
      uniqueId: createUniqueId(),
    });

    this.setState({
      products: this.state.products.push(newProduct),
      addedProducts: this.state.addedProducts.push(newProduct),
    });
  };

  setStateByKey = (index, key, value, uniqueId) => {
    const { products, addedProducts } = this.state;
    if (uniqueId) {
      this.setState({
        products: products.setIn([index, key], value),
        addedProducts: addedProducts.updateIn(
          [addedProducts.findIndex(product => product.get('uniqueId') === uniqueId), key],
          () => value
        ),
      });
    } else {
      this.setState({ products: products.setIn([index, key], value) });
    }
  };

  deleteImageByIndex = index => () => {
    const { products } = this.state;
    this.setState({
      products: products.updateIn([index, 'images'], images => List([])),
    });
  };

  removeProductByIndex = index => {
    const { products, deletedProducts, addedProducts } = this.state;
    const removeProduct = products.get(index);
    const uniqueIdFromRemoveProduct = removeProduct.get('uniqueId');
    const removeIndexOfAddedProducts = addedProducts.findIndex(
      product => product.get('uniqueId') === uniqueIdFromRemoveProduct
    );

    if (removeProduct.get('productSequence')) {
      this.setState({
        products: products.delete(index),
        deletedProducts: deletedProducts.push(removeProduct.get('productSequence')),
        addedProducts: addedProducts.delete(removeIndexOfAddedProducts),
      });
    } else {
      this.setState({ products: products.delete(index) });
    }
  };

  onImageChange = (e, index, form, uniqueId) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = upload => {
      const imageObject = Map({
        image: reader.result,
        imageName: file.name,
        imageType: file.type,
        modified: true,
      });
      const { products, addedProducts } = this.state;

      if (uniqueId) {
        this.setState({
          products: products.updateIn([index, 'images'], list => list.push(imageObject)),
          addedProducts: addedProducts.updateIn(
            [addedProducts.findIndex(product => product.get('uniqueId') === uniqueId), 'images'],
            images => images.push(imageObject)
          ),
        });
      } else {
        this.setState({
          products: products.updateIn([index, 'images'], images => images.push(imageObject)),
        });
      }
    };

    reader.readAsDataURL(file);
  };

  handleConfirm = () => {
    const { products, deletedProducts } = this.state;
    const { initAddProducts, history, franchise, editMode } = this.props;
    const franchiseSequence = franchise.get('seq');

    if (products.size === 0) return;
    for (let i = 0; i < products.size; i++) {
      if (products.getIn([i, 'images']).size === 0) return;
      if (products.getIn([i, 'title']).trim().length === 0) return;
      if (products.getIn([i, 'price']).trim().length === 0) return;
    }

    const result = {
      shop_seq: franchiseSequence,
      deleteProducts: deletedProducts.toJS(),
      products: getModifyProducts(products).toJS(),
    };

    if (editMode) {
      console.log(result);
    } else {
      initAddProducts({ products, seq: franchiseSequence })
        .then(result => {
          if (result.error) {
            console.error('add products error');
            return;
          }
          history.push('/result');
        })
        .catch(e => console.error(e));
    }
  };

  handleCancel = () => this.props.history.push('/');

  onBackButtonPress = () => {
    this.props.history.push('/franchise/addShop');
  };

  renderProducts = () => {
    const { products } = this.state;
    const { editMode } = this.props;
    if (products.size === 0) {
      return null;
    }

    return products.map((product, i) => (
      <Product
        product={product}
        index={i}
        key={`product-${i}`}
        editMode={editMode ? true : false}
        setStateByKey={this.setStateByKey}
        removeProductByIndex={this.removeProductByIndex}
        deleteImageByIndex={this.deleteImageByIndex}
        onImageChange={this.onImageChange}
      />
    ));
  };

  render() {
    const { authentication, franchise, editMode } = this.props;
    // if (!authentication.get('isLogin')) {
    //   return <Redirect to="/auth/signin" />;
    // }

    return (
      <div style={{ height: 'calc(100% - 66px)' }}>
        <div className="container" style={{ height: 'calc(100% - 62px)' }}>
          <div style={{ padding: '0 10px' }}>
            <div className="btn__add-product" onClick={this.addProduct}>
              <span id="icon-plus">+</span>
              <span>판매상품 추가</span>
            </div>
          </div>
          <div className="divider">
            <div />
          </div>
          <div style={{ overflowY: 'auto', maxHeight: 'calc(100% - 83px)' }}>
            {franchise.getIn(['status', 'isFetching']) ? <Loading /> : null}
            {this.renderProducts()}
          </div>
        </div>
        <Buttons
          handleConfirm={this.handleConfirm}
          handleCancel={this.handleCancel}
          editMode={editMode ? true : false}
        />
        {/*franchise.getIn(['status', 'addShop']) ? null : (
          <Popup onBackButtonPress={this.onBackButtonPress} />
        )*/}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.get('authentication'),
  franchise: state.get('franchise'),
});

const mapDispatchToProps = dispatch => ({
  initAddProducts: products => dispatch(initAddProducts(products)),
  initGetProducts: shopSequence => dispatch(initGetProducts(shopSequence)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);
