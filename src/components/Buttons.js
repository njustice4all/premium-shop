import React from 'react';
import classNames from 'classnames';

const Buttons = ({ handleConfirm, errors }) => {
  return (
    <div className="survay__btn__confirm__wrapper">
      <div className="survay__btn">취소하기</div>
      <div
        className={classNames('survay__btn btn__confirm', { wrong: errors })}
        onClick={handleConfirm}
      >
        등록하기
      </div>
    </div>
  );
};

export default Buttons;
