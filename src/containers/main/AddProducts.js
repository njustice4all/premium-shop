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

import { Product, Buttons, Loading, Popup, ProductInputModal } from '../../components';

class AddProducts extends Component {
  state = {
    products: List([]),
    deletedProducts: List([]),
    productStack: null,
    productInputModal: false,
    updateFromNewProduct: false,
  };

  componentDidMount = () => {
    if (this.props.editMode) this.onEditMode();
  };

  onEditMode = () => {
    const { initGetProducts, franchise } = this.props;
    if (!franchise.get('seq')) return;
    initGetProducts(franchise.get('seq')).then(result => {
      this.setState({
        products: convertDataToState(result.data).reverse(),
        shopSequence: franchise.get('seq'),
      });
    });
  };

  addProduct = () => {
    this.setState(prevState => ({
      productInputModal: true,
      productStack: Map({
        images: List([]),
        deleteImages: List([]),
        addImages: List([]),
        title: '',
        price: 0,
        options: List([]),
        contents: '',
        uniqueId: createUniqueId(),
        detailMode: true,
        productSequence: 'add',
      }),
    }));
  };

  setStateByKey = (index, key, value, uniqueId) => {
    const { productStack } = this.state;
    this.setState({
      productStack: productStack.set(key, value),
    });
  };

  // FIXME: 동작확인필수
  deleteImageByIndex = (productIndex, imageIndex, uniqueId) => () => {
    const { productStack } = this.state;
    const imageIdFromProductImage = productStack.getIn(['images', imageIndex, 'imageId']);

    if (productStack.get('uniqueId')) {
      this.setState({
        productStack: productStack.withMutations(mutator =>
          mutator.deleteIn(['images', imageIndex]).deleteIn(['addImages', imageIndex])
        ),
      });
    } else {
      this.setState({
        productStack: productStack.withMutations(mutator =>
          mutator
            .deleteIn(['images', imageIndex])
            .update(
              'deleteImages',
              deleteImages =>
                productStack.getIn(['images', imageIndex, 'seq'])
                  ? deleteImages.push(productStack.getIn(['images', imageIndex, 'seq']))
                  : List([])
            )
            .deleteIn(
              'addImages',
              productStack
                .get('addImages')
                .findIndex(images => images.get('imageId') === imageIdFromProductImage)
            )
        ),
      });
    }
  };

  // FIXME: 동작확인필수
  removeProductByIndex = productIndex => () => {
    const { products, deletedProducts, productStack } = this.state;
    const { initSetProducts, franchise } = this.props;
    const removeProduct = products.get(productIndex);

    if (removeProduct.get('uniqueId')) {
      this.setState({ products: products.delete(productIndex) });
    } else {
      this.setState({
        products: products.delete(productIndex),
        deletedProducts: deletedProducts.push(removeProduct.get('productSequence')),
        productStack: null,
        productInputModal: false,
      });
    }

    // const result = {
    //   shop_seq: franchise.get('seq'),
    //   deleteProducts: deletedProducts.toJS(),
    //   products: getModifyProducts(productStack).toJS(),
    // };
    console.log(removeProduct.toJS());

    // initSetProducts();
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
          productStack: prevState.productStack.withMutations(mutator =>
            mutator
              .update('images', images => images.push(image))
              .update('addImages', addImages => addImages.push(image))
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
      history.push('/result');
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

  // TODO: working...
  testConfirm = () => {
    const { franchise, initSetProducts, initAddProducts, editMode } = this.props;
    const { deletedProducts, productStack, updateFromNewProduct } = this.state;
    const result = {
      shop_seq: franchise.get('seq'),
      deleteProducts: deletedProducts.toJS(),
      products: getModifyProducts(productStack).toJS(),
    };
    const productIndex = productStack.get('productIndex');

    // console.log(productStack.get('title'), productStack.get('price'));
    // 수정중일때 새상품추가
    if (editMode) {
      if (productStack.get('uniqueId')) {
        this.setState(prevState => ({
          products: prevState.products.unshift(productStack),
          productInputModal: false,
          productStack: null,
        }));
      } else {
        this.setState(prevState => ({
          products: prevState.products.update(productIndex, () => productStack),
          productInputModal: false,
          productStack: null,
        }));
      }

      initSetProducts(result);
    } else {
      if (updateFromNewProduct) {
        this.setState(prevState => ({
          products: prevState.products.update(productIndex, () => productStack),
          productInputModal: false,
          productStack: null,
        }));
      } else {
        this.setState(prevState => ({
          products: prevState.products.unshift(productStack),
          productInputModal: false,
          productStack: null,
        }));
      }

      initAddProducts({ products: convertProducts(productStack), seq: franchise.get('seq') });
    }
  };

  togglePopup = (productIndex, type) => () => {
    const { editMode } = this.props;
    if (type === 'close') {
      this.setState({
        productStack: null,
        productInputModal: false,
        updateFromNewProduct: false,
      });
    } else {
      if (!editMode) {
        this.setState({
          productStack: this.state.products.get(productIndex).merge({ productIndex }),
          productInputModal: true,
          updateFromNewProduct: true,
        });
      } else {
        this.setState({
          productStack: this.state.products.get(productIndex).merge({ productIndex }),
          productInputModal: true,
          updateFromNewProduct: false,
        });
      }
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
        togglePopup={this.togglePopup}
      />
    ));
  };

  onOptionChange = (productIndex, optionIndex, type) => e => {
    e.persist();
    this.setState(prevState => ({
      productStack: prevState.productStack.setIn(['options', optionIndex, type], e.target.value),
    }));
  };

  onAddOptionButtonPress = productIndex => () => {
    if (this.state.productStack.get('options').size > 4) {
      return;
    }

    this.setState(prevState => ({
      productStack: prevState.productStack.update('options', options =>
        options.push(Map({ name: '', price: 0 }))
      ),
    }));
  };

  deleteOptionByIndex = (productIndex, optionIndex) => () => {
    this.setState(prevState => ({
      productStack: prevState.productStack.deleteIn(['options', optionIndex]),
    }));
  };

  render() {
    const { authentication, franchise, editMode } = this.props;
    const { productInputModal, productStack } = this.state;
    if (!authentication.get('isLogin')) {
      return <Redirect to="/auth/signin" />;
    }

    return (
      <div style={{ height: 'calc(100% - 75px)' }}>
        <div className="container" style={{ minHeight: 'calc(100% - 59px)', padding: 0 }}>
          <div>
            <div style={{ padding: '0 10px' }}>
              <div className="btn__add-product" onClick={this.addProduct}>
                <span id="icon-plus">+</span>
                <span>판매상품 추가</span>
              </div>
            </div>
            <div className="divider">
              <div />
            </div>
            {franchise.getIn(['status', 'isFetching']) ? <Loading /> : null}
            {this.renderProducts()}
          </div>
        </div>
        {productInputModal ? (
          <ProductInputModal
            product={productStack}
            productIndex={productStack.get('productIndex')}
            setStateByKey={this.setStateByKey}
            removeProductByIndex={this.removeProductByIndex}
            deleteImageByIndex={this.deleteImageByIndex}
            onImageChange={this.onImageChange}
            shopSequence={franchise.get('seq')}
            onAddOptionButtonPress={this.onAddOptionButtonPress}
            deleteOptionByIndex={this.deleteOptionByIndex}
            onOptionChange={this.onOptionChange}
            togglePopup={this.togglePopup}
            testConfirm={this.testConfirm}
          />
        ) : null}
        <div
          className="button-list center"
          onClick={() => {
            if (this.props.editMode) {
              this.props.history.push('/franchise/list');
            } else {
              this.props.history.push('/');
            }
          }}
        >
          {editMode ? '상품 목록' : '메인으로'}
        </div>
        {/*<Buttons
          handleConfirm={this.handleConfirm}
          handleCancel={this.handleCancel}
          editMode={editMode ? true : false}
        />*/}
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
