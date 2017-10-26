import React, { Component } from 'react';

class Product extends Component {
  render() {
    const {
      product,
      index,
      setStateByKey,
      removeProductByIndex,
      deleteImageByIndex,
      onImageChange,
    } = this.props;
    const uniqueId = product.get('uniqueId');

    return (
      <div className="items products">
        <div className="product__wrapper">
          <div className="product__image__wrapper">
            <div className="full-block">
              <label className="full-block center">
                {product.getIn(['images', 0]) ? (
                  <img
                    onClick={deleteImageByIndex(index)}
                    className="img-cover"
                    src={
                      uniqueId
                        ? product.getIn(['images', 0, 'image'])
                        : product.getIn(['images', 0, 'modified'])
                          ? product.getIn(['images', 0, 'image'])
                          : `http://van.aty.kr/image/${product.getIn(['images', 0, 'imageName'])}`
                    }
                    alt=""
                  />
                ) : (
                  '+'
                )}
                {product.get('images').size === 0 ? (
                  <form
                    onChange={e => onImageChange(e, index, this.form, uniqueId)}
                    encType="multipart/form-data"
                    ref={form => (this.form = form)}
                  >
                    <input style={{ display: 'none' }} accept="image/*" name="photo" type="file" />
                  </form>
                ) : null}
              </label>
            </div>
          </div>
          <div className="product__form__wrapper">
            <div className="row-wrapper">
              <span>상품명</span>
              <input
                type="text"
                value={product.get('title')}
                placeholder="상품명을 입력하세요."
                onChange={e => setStateByKey(index, 'title', e.target.value, uniqueId)}
              />
            </div>
            <div className="product__btn__remove" onClick={() => removeProductByIndex(index)}>
              <i className="fa fa-times" aria-hidden="true" />
            </div>
            <div className="row-wrapper" style={{ marginTop: '8px', position: 'relative' }}>
              <span>가격</span>
              <input
                type="number"
                value={product.get('price')}
                onChange={e => setStateByKey(index, 'price', e.target.value, uniqueId)}
              />
              <span id="currency">원</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
