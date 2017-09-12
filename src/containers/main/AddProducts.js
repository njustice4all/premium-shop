import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

import { initAddProducts } from '../../actions';

import { Product, Buttons } from '../../components';

class AddProducts extends Component {

  state = { products: [] }

  addProduct = () => {
    const productPrototype = { image: '', preview: '', title: '', price: 0 };
    this.setState((prevState) => ({
      products: [...prevState.products, productPrototype]
    }));
  }

  handleProductChange = (index, key, value) => {
    this.setState((prevState) => {
      const list = fromJS(prevState.products);
      return {
        products: list.setIn([index, key], value).setIn([index, key], value).toJS()
      };
    });
  }

  removeProduct = (index) => {
    this.setState((prevState) => {
      const list = fromJS(prevState.products);
      return {
        products: list.delete(index).toJS()
      };
    });
  }

  onImageChange = (e, index, form) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = (upload) => {
      this.setState((prevState) => {
        const list = fromJS(prevState.products);
        return {
          products: list.setIn([index, 'image'], file).setIn([index, 'preview'], reader.result).toJS()
        };
      });
    };

    reader.readAsDataURL(file);
  }

  isEmptyProduct = (product) => {
    if (product.preview && product.title && product.price) {
      return false;
    }
    return true;
  }

  handleConfirm = () => {
    const { products } = this.state;
    const { initAddProducts } = this.props;
    initAddProducts(products);
  }

  renderProducts = () => {
    const { products } = this.state;
    if (products.length === 0) {
      return null;
    }

    return products.map((value, i) =>
      <Product
        {...value}
        index={i}
        key={`product-${i}`}
        handleProductChange={this.handleProductChange}
        removeProduct={this.removeProduct}
        onImageChange={this.onImageChange}
      />
    );
  }

  render() {
    return (
      <div className="container">
        {this.renderProducts()}
        <div className="btn__add-product" onClick={() => this.addProduct()}>판매상품 추가</div>
        <Buttons handleConfirm={this.handleConfirm} />
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    initAddProducts: (products) => dispatch(initAddProducts(products))
  };
};

export default connect(undefined, mapDispatchToProps)(AddProducts);
