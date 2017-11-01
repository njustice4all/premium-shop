import React, { Component } from 'react';

import ProductExpand from './ProductExpand';

const ProductImage = ({ product, shopSequence }) => {
  const imageName = product.getIn(['images', 0, 'imageName']);
  if (product.get('uniqueId')) {
    return <img src={product.getIn(['images', 0, 'image'])} alt="" />;
  }

  return <img src={`http://van.aty.kr/image/${shopSequence}/${imageName}`} alt="" />;
};

export default class Product extends Component {
  render() {
    const { product, productIndex, toggleDetailMode, shopSequence } = this.props;

    if (product.get('detailMode')) {
      return <ProductExpand {...this.props} />;
    }

    return (
      <div className="items products">
        <div className="product__wrapper-normal">
          <div className="image__wrapper">
            <i className="fa fa-camera" aria-hidden="true" />
            <ProductImage product={product} shopSequence={shopSequence} />
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
                상세보기
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
