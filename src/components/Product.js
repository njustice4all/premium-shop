import React, { Component } from 'react';

import ProductExpand from './ProductExpand';

export default class Product extends Component {
  getOneImage = () => {
    const { shopSequence, product } = this.props;
    const imageName = product.getIn(['images', 0, 'imageName']);

    return `http://van.aty.kr/image/${shopSequence}/${imageName}`;
  };

  render() {
    const { product, productIndex, toggleDetailMode } = this.props;

    if (product.get('detailMode')) {
      return <ProductExpand {...this.props} />;
    }

    console.log(product.toJS());

    return (
      <div className="items products">
        <div className="product__wrapper-normal">
          <div className="image__wrapper">
            <i className="fa fa-camera" aria-hidden="true" />
            <img src={this.getOneImage()} alt="" />
          </div>
          <div className="product__form__wrapper">
            <div className="contents-row">
              <p>{product.get('title')}</p>
            </div>
            <div className="contents-row">
              <p>
                {product.get('price')}
                <span style={{ marginLeft: '5px' }}>원</span>
              </p>
            </div>
            <div className="contents-row">
              <span className="button-detail" onClick={toggleDetailMode(productIndex)}>
                상세보기 & 수정하기
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
