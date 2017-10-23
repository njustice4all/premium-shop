import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { Redirect } from 'react-router-dom';
import { Map, List } from 'immutable';

import { initAddProducts } from '../../actions';

import { Product, Buttons, Loading, Popup } from '../../components';

class AddProducts extends Component {
  state = { products: List([]) };

  addProduct = () => {
    this.setState({
      products: this.state.products.push(
        Map({
          image: '',
          imageName: '',
          imageType: '',
          title: '',
          price: 0,
        })
      ),
    });
  };

  setStateByKey = (index, key, value) => {
    this.setState({ products: this.state.products.setIn([index, key], value) });
  };

  removeProduct = index => this.setState({ products: this.state.products.delete(index) });

  onImageChange = (e, index, form) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = upload => {
      this.setState({
        products: this.state.products
          .setIn([index, 'image'], reader.result)
          .setIn([index, 'imageName'], file.name)
          .setIn([index, 'imageType'], file.type),
      });
    };

    reader.readAsDataURL(file);
  };

  isEmptyProduct = product => {
    if (product.image && product.title && product.price) {
      return false;
    }
    return true;
  };

  handleConfirm = () => {
    const { products } = this.state;
    const { initAddProducts, history, franchise } = this.props;

    if (products.size === 0) return;
    for (let i = 0; i < products.size; i++) {
      if (
        products
          .get(i)
          .get('image')
          .trim().length === 0
      )
        return;
      if (
        products
          .get(i)
          .get('title')
          .trim().length === 0
      )
        return;
      if (
        products
          .get(i)
          .get('price')
          .trim().length === 0
      )
        return;
    }

    initAddProducts({ products: products.toJS(), seq: '22' })
      // initAddProducts({ products, seq: franchise.get('seq') })
      .then(result => {
        if (result.error) {
          console.error('add products error');
          return;
        }
        history.push('/result');
      })
      .catch(e => console.error(e));
  };

  onBackButtonPress = () => {
    this.props.history.push('/franchise/addShop');
  };

  renderProducts = () => {
    const { products } = this.state;
    if (products.size === 0) {
      return null;
    }

    return products.map((product, i) => (
      <Product
        product={product}
        index={i}
        key={`product-${i}`}
        setStateByKey={this.setStateByKey}
        removeProduct={this.removeProduct}
        onImageChange={this.onImageChange}
      />
    ));
  };

  render() {
    const { authentication, franchise } = this.props;
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
        <Buttons handleConfirm={this.handleConfirm} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);
