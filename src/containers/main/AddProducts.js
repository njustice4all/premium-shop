import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Map, List } from 'immutable';

import { initAddProducts, initGetProducts, initSetProducts } from '../../actions';
import {
  convertDataToState,
  createUniqueId,
  getModifyProducts,
  convertProducts,
} from '../../utils';

import { Product, Buttons, Loading, Popup } from '../../components';

class AddProducts extends Component {
  state = {
    products: List([]),
    deletedProducts: List([]),
  };

  componentDidMount = () => {
    if (this.props.editMode) this.onEditMode();
  };

  onEditMode = () => {
    const { initGetProducts, franchise } = this.props;
    if (!franchise.get('seq')) return;
    initGetProducts(franchise.get('seq')).then(result => {
      this.setState({
        products: convertDataToState(result.data),
        shopSequence: franchise.get('seq'),
      });
    });
  };

  addProduct = () => {
    const newProduct = Map({
      images: List([]),
      deleteImages: List([]),
      addImages: List([]),
      title: '',
      price: 0,
      options: List([]),
      contents: '',
      uniqueId: createUniqueId(),
    });

    this.setState({
      products: this.state.products.push(newProduct),
    });
  };

  setStateByKey = (index, key, value, uniqueId) => {
    const { products } = this.state;
    if (uniqueId) {
      this.setState({
        products: products.setIn([index, key], value),
      });
    } else {
      this.setState({ products: products.setIn([index, key], value) });
    }
  };

  deleteImageByIndex = (productIndex, imageIndex, uniqueId) => () => {
    const { products } = this.state;
    const product = products.get(productIndex);
    const imageIdFromProductImage = product.getIn(['images', imageIndex, 'imageId']);

    if (product.get('uniqueId')) {
      this.setState({
        products: products.withMutations(mutator =>
          mutator
            .deleteIn([productIndex, 'images', imageIndex])
            .deleteIn([productIndex, 'addImages', imageIndex])
        ),
      });
    } else {
      this.setState({
        products: products.withMutations(mutator =>
          mutator
            .deleteIn([productIndex, 'images', imageIndex])
            .updateIn(
              [productIndex, 'deleteImages'],
              deleteImages =>
                product.getIn(['images', imageIndex, 'seq'])
                  ? deleteImages.push(product.getIn(['images', imageIndex, 'seq']))
                  : List([])
            )
            .deleteIn([
              productIndex,
              'addImages',
              products
                .getIn([productIndex, 'addImages'])
                .findIndex(images => images.get('imageId') === imageIdFromProductImage),
            ])
        ),
      });
    }
  };

  removeProductByIndex = index => {
    const { products, deletedProducts } = this.state;
    const removeProduct = products.get(index);

    if (removeProduct.get('productSequence')) {
      this.setState({
        products: products.delete(index),
        deletedProducts: deletedProducts.push(removeProduct.get('productSequence')),
      });
    } else {
      this.setState({ products: products.delete(index) });
    }
  };

  onImageChange = productIndex => e => {
    e.preventDefault();
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const image = Map({
          image: reader.result,
          imageName: files[i].name,
          imageType: files[i].type,
          imageId: createUniqueId(),
        });

        this.setState(prevState => ({
          products: prevState.products.withMutations(mutator =>
            mutator
              .updateIn([productIndex, 'images'], images => images.push(image))
              .updateIn([productIndex, 'addImages'], addImages => addImages.push(image))
          ),
        }));
      };

      reader.readAsDataURL(files[i]);
    }
  };

  handleConfirm = () => {
    const { products, deletedProducts } = this.state;
    const { initAddProducts, initSetProducts, history, franchise, editMode } = this.props;
    const franchiseSequence = franchise.get('seq');

    if (products.size === 0) return;
    for (let i = 0; i < products.size; i++) {
      if (products.getIn([i, 'images']).size === 0) return;
      if (products.getIn([i, 'title']).trim().length === 0) return;
      // if (products.getIn([i, 'price']).trim().length === 0) return;
    }

    if (editMode) {
      const result = {
        shop_seq: franchiseSequence,
        deleteProducts: deletedProducts.toJS(),
        products: getModifyProducts(products).toJS(),
      };

      initSetProducts(result);
    } else {
      const result = convertProducts(products);
      initAddProducts({ products: result, seq: franchiseSequence })
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
    const { editMode, franchise } = this.props;
    if (products.size === 0) {
      return null;
    }

    return products.map((product, i) => (
      <Product
        product={product}
        productIndex={i}
        key={`product-${i}`}
        editMode={editMode ? true : false}
        setStateByKey={this.setStateByKey}
        removeProductByIndex={this.removeProductByIndex}
        deleteImageByIndex={this.deleteImageByIndex}
        onImageChange={this.onImageChange}
        shopSequence={franchise.get('seq')}
        onAddOptionButtonPress={this.onAddOptionButtonPress}
        deleteOptionByIndex={this.deleteOptionByIndex}
        onOptionChange={this.onOptionChange}
      />
    ));
  };

  onOptionChange = (productIndex, optionIndex) => e => {
    e.persist();
    this.setState(prevState => ({
      products: prevState.products.setIn(
        [productIndex, 'options', optionIndex, 'text'],
        e.target.value
      ),
    }));
  };

  onAddOptionButtonPress = productIndex => () => {
    if (this.state.products.getIn([productIndex, 'options']).size > 4) {
      return;
    }

    this.setState(prevState => ({
      products: prevState.products.updateIn([productIndex, 'options'], options =>
        options.push(
          Map({
            text: '',
          })
        )
      ),
    }));
  };

  deleteOptionByIndex = (productIndex, optionIndex) => () => {
    this.setState(prevState => ({
      products: prevState.products.deleteIn([productIndex, 'options', optionIndex]),
    }));
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
  initSetProducts: products => dispatch(initSetProducts(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);
