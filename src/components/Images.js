import React from 'react';

const Images = ({
  imagePreviewUrl,
  handleChange,
  renderRowTop,
  renderRowBottom,
}) => {
  const button = (
    <div className="images">
      <label htmlFor="upload-image">
        <h1>+</h1>
      </label>
      <input
        style={{ display: 'none' }}
        id="upload-image"
        multiple
        accept="image/*"
        name="photo"
        type="file"
        onChange={(e) => handleChange(e)} />
    </div>
  );

  return (
    <div className="items">
      <h5 className="title__big">가맹점 이미지 (외부3 / 내부5)</h5>
      <div className="image__wrapper">
        {renderRowTop(imagePreviewUrl)}
        {imagePreviewUrl.length > 3 ? null : button}
      </div>
      {
        imagePreviewUrl.length > 3 ?
          <div className="image__wrapper">
            {renderRowBottom(imagePreviewUrl)}
            {imagePreviewUrl.length > 3 && imagePreviewUrl.length < 8 ? button : null}
          </div> : null
      }
    </div>
  );
};

export default Images;
