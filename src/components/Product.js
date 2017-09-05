import React from 'react';

const Product = ({
  preview,
  title,
  price,
  index,
  handleProductChange,
  removeProduct,
  onImageChange,
}) => {
  return (
    <div className="items">
      <div className="product__wrapper">
        <div className="product__image__wrapper">
          <div className="full-block">
            <label className="full-block center">
              {preview ? <img className="img-cover" src={preview} alt='' /> : '+'}
              <input
                style={{ display: 'none' }}
                accept="image/*"
                name="photo"
                type="file"
                onChange={(e) => onImageChange(e, index)}
              />
            </label>
          </div>
        </div>
        <div className="product__form__wrapper">
          <input
            type="text"
            value={title}
            placeholder="상품명을 입력하세요."
            onChange={(e) => handleProductChange(index, 'title', e.target.value)}
          />
          <div className="product__btn__remove" onClick={() => removeProduct(index)}>X</div>
          <input
            type="number"
            value={price}
            style={{ marginTop: '8px', textAlign: 'right' }}
            onChange={(e) => handleProductChange(index, 'price', e.target.value)}
          />
          <span style={{ marginLeft: '5px' }}>원</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
