import React, { Component } from 'react';

const ButtonAddImage = ({ onImageChange, productIndex }) => {
  return (
    <div className="images" style={{ verticalAlign: 'middle' }}>
      <label>
        <h1>+</h1>
        <input
          style={{ display: 'none' }}
          multiple
          accept="image/*"
          name="photo"
          type="file"
          onChange={onImageChange(productIndex)}
        />
      </label>
    </div>
  );
};

const ProductImage = ({ deleteImageByIndex, image, imageIndex, productIndex, shopSequence }) => {
  return (
    <div className="images" style={{ verticalAlign: 'middle' }} key={`productImage-${imageIndex}`}>
      <span className="btn-delete" onClick={deleteImageByIndex(productIndex, imageIndex)}>
        <i className="fa fa-minus-square-o" aria-hidden="true" />
      </span>
      <img
        className="img-cover"
        src={
          image.get('imageId')
            ? image.get('image')
            : `http://van.aty.kr/image/${shopSequence}/${image.get('imageName')}`
        }
        alt=""
      />
    </div>
  );
};

class Product extends Component {
  render() {
    const {
      product,
      productIndex,
      setStateByKey,
      removeProductByIndex,
      deleteImageByIndex,
      onImageChange,
      shopSequence,
    } = this.props;
    const uniqueId = product.get('uniqueId');

    return (
      <div className="items products">
        <div className="product__wrapper">
          <div className="image__wrapper">
            <ButtonAddImage onImageChange={onImageChange} productIndex={productIndex} />
            {product
              .get('images')
              .map((image, imageIndex) => (
                <ProductImage
                  image={image}
                  imageIndex={imageIndex}
                  deleteImageByIndex={deleteImageByIndex}
                  productIndex={productIndex}
                  shopSequence={shopSequence}
                  key={`productImage-${imageIndex}`}
                />
              ))}
          </div>
          <div className="product__form__wrapper">
            <div className="row-wrapper">
              <span>상품명</span>
              <input
                type="text"
                value={product.get('title')}
                placeholder="상품명을 입력하세요."
                onChange={e => setStateByKey(productIndex, 'title', e.target.value, uniqueId)}
              />
            </div>
            <div
              className="product__btn__remove"
              onClick={() => removeProductByIndex(productIndex)}
              style={{ position: 'absolute' }}
            >
              <i className="fa fa-times" aria-hidden="true" />
            </div>
            <div className="row-wrapper" style={{ marginTop: '8px', position: 'relative' }}>
              <span>가격</span>
              <input
                type="number"
                value={product.get('price')}
                onChange={e => setStateByKey(productIndex, 'price', e.target.value, uniqueId)}
              />
              <span id="currency">원</span>
            </div>
            <div className="row-wrapper" style={{ marginTop: '8px', position: 'relative' }}>
              <span>옵션</span>
              <input
                type="text"
                // value={product.getIn(['option', 0, 'text'])}
                defaultValue={product.getIn(['option', 0, 'text'])}
                onChange={e => setStateByKey(productIndex, 'option', e.target.value, uniqueId)}
              />
            </div>
            <div className="row-wrapper" style={{ marginTop: '8px', position: 'relative' }}>
              <span>설명</span>
              <input
                type="text"
                value={product.get('contents')}
                onChange={e => setStateByKey(productIndex, 'contents', e.target.value, uniqueId)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
