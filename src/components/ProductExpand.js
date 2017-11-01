import React from 'react';

const ButtonAddImage = ({ onImageChange, productIndex }) => {
  return (
    <div className="images products">
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
    <div className="images products" key={`productImage-${imageIndex}`}>
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
  onAddOptionButtonPress,
}) => {
  return (
    <div className="options">
      <div className="option-name">
        <span>{`옵션 ${optionIndex + 1}`}</span>
      </div>
      <div className="option-input-name">
        <input
          type="text"
          value={value.get('name')}
          onChange={onOptionChange(productIndex, optionIndex, 'name')}
        />
      </div>
      <div className="option-price">
        <span>가격</span>
      </div>
      <div className="option-input-price">
        <input
          type="number"
          value={value.get('price')}
          onChange={onOptionChange(productIndex, optionIndex, 'price')}
        />
        <span>원</span>
      </div>
      <div className="button-delete" onClick={deleteOptionByIndex(productIndex, optionIndex)}>
        <img src="/img/icon-close.png" alt="" />
      </div>
    </div>
  );
};

const OptionWrapper = ({
  onAddOptionButtonPress,
  productIndex,
  product,
  onOptionChange,
  deleteOptionByIndex,
  uniqueId,
}) => {
  return (
    <div className="row-wrapper options" style={{ position: 'relative' }}>
      <div className="option-wrapper">
        {product
          .get('options')
          .map((option, index) => (
            <Options
              key={`option-${index}`}
              value={product.getIn(['options', index])}
              onOptionChange={onOptionChange}
              deleteOptionByIndex={deleteOptionByIndex}
              productIndex={productIndex}
              uniqueId={uniqueId}
              optionIndex={index}
              onAddOptionButtonPress={onAddOptionButtonPress}
            />
          ))}
        <div className="btn-add-option">
          <span onClick={onAddOptionButtonPress(productIndex)}>+ 옵션 추가</span>
        </div>
      </div>
    </div>
  );
};

const ProductExpand = ({
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
  toggleDetailMode,
}) => {
  const uniqueId = product.get('uniqueId');

  return (
    <div className="items products">
      <div className="product__wrapper">
        <div className="wrapper-padding">
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
        </div>
        <div className="product__form__wrapper">
          <div className="wrapper-padding">
            <div className="row-wrapper">
              <span className="row-title">상품명</span>
              <input
                type="text"
                value={product.get('title')}
                placeholder="상품명을 입력하세요."
                onChange={e => setStateByKey(productIndex, 'title', e.target.value, uniqueId)}
              />
            </div>
            {/*<div
              className="product__btn__remove"
              onClick={removeProductByIndex(productIndex)}
              style={{ position: 'absolute' }}
            >
              <i className="fa fa-times" aria-hidden="true" />
            </div>*/}
            <div className="row-wrapper" style={{ marginTop: '8px', position: 'relative' }}>
              <span className="row-title">가격</span>
              <input
                type="number"
                value={product.get('price')}
                onChange={e => setStateByKey(productIndex, 'price', e.target.value, uniqueId)}
                onClick={e => e.target.select()}
              />
              <span id="currency">원</span>
            </div>
            <div className="row-wrapper" style={{ marginTop: '8px', position: 'relative' }}>
              <span className="row-title">설명</span>
              <input
                type="text"
                value={product.get('contents')}
                onChange={e => setStateByKey(productIndex, 'contents', e.target.value, uniqueId)}
              />
            </div>
          </div>
          <OptionWrapper
            product={product}
            onAddOptionButtonPress={onAddOptionButtonPress}
            productIndex={productIndex}
            onOptionChange={onOptionChange}
            deleteOptionByIndex={deleteOptionByIndex}
            uniqueId={uniqueId}
          />
          <div className="button-normal">
            <span onClick={toggleDetailMode(productIndex)}>요약보기</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductExpand;
