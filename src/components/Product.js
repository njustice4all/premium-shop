import React, { Component } from 'react';

const ButtonAddImage = ({ onImageChange, productIndex }) => {
  return (
    <div className="images products" style={{ verticalAlign: 'middle' }}>
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
    <div
      className="images products"
      style={{ verticalAlign: 'middle' }}
      key={`productImage-${imageIndex}`}
    >
      <span className="btn-delete" onClick={deleteImageByIndex(productIndex, imageIndex)}>
        <img src="/img/icon06.png" alt="" />
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

const Options = ({
  value,
  onOptionChange,
  productIndex,
  uniqueId,
  optionIndex,
  deleteOptionByIndex,
}) => {
  return (
    <div>
      <input type="text" value={value} onChange={onOptionChange(productIndex, optionIndex)} />
      <span>
        <button onClick={deleteOptionByIndex(productIndex, optionIndex)}>삭제</button>
      </span>
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
      onAddOptionButtonPress,
      deleteOptionByIndex,
      onOptionChange,
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
            {/*<div
              className="product__btn__remove"
              onClick={() => removeProductByIndex(productIndex)}
              style={{ position: 'absolute' }}
            >
              <i className="fa fa-times" aria-hidden="true" />
            </div>*/}
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
              <span>설명</span>
              <input
                type="text"
                value={product.get('contents')}
                onChange={e => setStateByKey(productIndex, 'contents', e.target.value, uniqueId)}
              />
            </div>
            <button onClick={onAddOptionButtonPress(productIndex)}>Add Option</button>
            <div className="row-wrapper options" style={{ marginTop: '8px', position: 'relative' }}>
              <h1>옵션</h1>
              {product
                .get('options')
                .map((option, index) => (
                  <Options
                    key={`option-${index}`}
                    value={product.getIn(['options', index, 'text'])}
                    onOptionChange={onOptionChange}
                    deleteOptionByIndex={deleteOptionByIndex}
                    productIndex={productIndex}
                    uniqueId={uniqueId}
                    optionIndex={index}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
