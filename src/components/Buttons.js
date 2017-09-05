import React from 'react';

const Buttons = ({ handleConfirm }) => {
  return (
    <div className="survay__btn__confirm__wrapper">
      <div className="survay__btn">취소하기</div>
      <div className="survay__btn btn__confirm" onClick={handleConfirm}>등록하기</div>
    </div>
  );
};

export default Buttons;
