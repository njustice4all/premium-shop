import React, { Component } from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);

    this.shop = ['addShop', 'setShop'];
    this.product = ['addProducts', 'setProducts'];
    this.addTypes = ['addShop', 'addProducts'];
    this.setTypes = ['setShop', 'setProducts'];
  }
  getClassNameByType = type => {
    const { location } = this.props;
    const locationArr = location.pathname.split('/');
    let result = null;

    if (type === 'shop') {
      locationArr.forEach(item => {
        if (this.shop.includes(item)) {
          result = true;
        }
      });
    } else {
      locationArr.forEach(item => {
        if (this.product.includes(item)) {
          result = true;
        }
      });
    }

    return result;
  };

  getHeaderContentsObject = () => {
    const { franchise, location } = this.props;
    const locationArr = location.pathname.split('/');
    const shopSequence = franchise.get('seq');
    let result = null;

    locationArr.forEach(item => {
      if (this.addTypes.includes(item)) {
        result = {
          shop: { link: '/franchise/addShop', title: '가맹점 정보' },
          product: { link: '/franchise/addProducts', title: '판매 상품 정보' },
        };
      }
    });

    locationArr.forEach(item => {
      if (this.setTypes.includes(item)) {
        result = {
          shop: { link: `/franchise/setShop/${shopSequence}`, title: '가맹점 정보 수정' },
          product: { link: '/franchise/setProducts', title: '판매 상품 정보 수정' },
        };
      }
    });

    return result;
  };

  render() {
    return (
      <header className="header__nav">
        <Link
          to={this.getHeaderContentsObject().shop.link}
          // className="header__nav__link"
          // activeClassName="on"
          className={classNames('header__nav__link', {
            on: this.getClassNameByType('shop'),
            // on: location.pathname === '/franchise/addShop' ? true : false,
          })}
        >
          {this.getHeaderContentsObject().shop.title}
        </Link>
        <Link
          to={this.getHeaderContentsObject().product.link}
          // className="header__nav__link"
          // activeClassName="on"
          className={classNames('header__nav__link', {
            on: this.getClassNameByType('product'),
            // on: location.pathname === '/franchise/addProducts' ? true : false,
          })}
        >
          {this.getHeaderContentsObject().product.title}
        </Link>
      </header>
    );
  }
}

export default withRouter(
  connect(state => ({
    franchise: state.get('franchise'),
  }))(Header)
);
