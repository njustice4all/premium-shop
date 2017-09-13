import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { Redirect } from 'react-router-dom';

import { initAddProducts } from '../../actions';
import isLogged from '../../utils';

import { Product, Buttons, Loading } from '../../components';

class AddProducts extends Component {

  state = { products: [] }

  addProduct = () => {
    const productPrototype = { image: '', imageName: '', imageType: '', title: '', price: 0 };
    this.setState((prevState) => ({
      products: [...prevState.products, productPrototype]
    }));
  }

  setStateByKey = (index, key, value) => {
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
          products: list.setIn([index, 'image'], reader.result)
                        .setIn([index, 'imageName'], file.name)
                        .setIn([index, 'imageType'], file.type)
                        .toJS()
        };
      });
    };

    reader.readAsDataURL(file);
  }

  isEmptyProduct = (product) => {
    if (product.image && product.title && product.price) {
      return false;
    }
    return true;
  }

  handleConfirm = () => {
    const { products } = this.state;
    const { initAddProducts, history, franchise } = this.props;

    if (products.length === 0) return;
    for (let i = 0; i < products.length; i++) {
      if (products[i].image.trim().length === 0) return;
      if (products[i].title.trim().length === 0) return;
      if (products[i].price.trim().length === 0) return;
    }

    initAddProducts({ products, seq: franchise.seq })
      .then((result) => {
        if (result.error) {
          console.error('add products error');
          return;
        }
        history.push('/result');
      })
      .catch(e => console.error(e));
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
        setStateByKey={this.setStateByKey}
        removeProduct={this.removeProduct}
        onImageChange={this.onImageChange}
      />
    );
  }

  render() {
    if (!isLogged()) return <Redirect to="/" />;

    return (
      <div className="container">
        {this.props.franchise.status.isFetching ? <Loading /> : null}
        {this.renderProducts()}
        <div className="btn__add-product" onClick={() => this.addProduct()}>판매상품 추가</div>
        <Buttons handleConfirm={this.handleConfirm} />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    franchise: state.franchise
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initAddProducts: (products) => dispatch(initAddProducts(products))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);
