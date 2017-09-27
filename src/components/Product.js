import React, { Component } from 'react';

class Product extends Component {
  render() {
    const { image, title, price, index, setStateByKey, removeProduct, onImageChange } = this.props;

    return (
      <div className="items products">
        <div className="product__wrapper">
          <div className="product__image__wrapper">
            <div className="full-block">
              <label className="full-block center">
                {image ? <img className="img-cover" src={image} alt="" /> : '+'}
                <form
                  onChange={e => onImageChange(e, index, this.form)}
                  encType="multipart/form-data"
                  ref={form => (this.form = form)}
                >
                  <input style={{ display: 'none' }} accept="image/*" name="photo" type="file" />
                </form>
              </label>
            </div>
          </div>
          <div className="product__form__wrapper">
            <div className="row-wrapper">
              <span>상품명</span>
              <input
                type="text"
                value={title}
                placeholder="상품명을 입력하세요."
                onChange={e => setStateByKey(index, 'title', e.target.value)}
              />
            </div>
            <div className="product__btn__remove" onClick={() => removeProduct(index)}>
              <i className="fa fa-times" aria-hidden="true" />
            </div>
            <div className="row-wrapper" style={{ marginTop: '8px', position: 'relative' }}>
              <span>가격</span>
              <input
                type="number"
                value={price}
                onChange={e => setStateByKey(index, 'price', e.target.value)}
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
