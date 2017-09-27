// @flow

import React from 'react';
import classNames from 'classnames';

type Props = {
  handleConfirm: Function,
  errors: boolean,
};

{
  /*<div className="survay__btn__confirm__wrapper">
  <div className="survay__btn">취소하기</div>
  <div
    className={classNames('survay__btn btn__confirm', { wrong: errors })}
    onClick={handleConfirm}
  >
    등록하기
  </div>
</div>*/
}
const Buttons = ({ handleConfirm, errors }: Props) => {
  return (
    <div style={{ padding: '0 10px' }}>
      <div className="divider">
        <div />
      </div>
      <div className="survay__btn__confirm__wrapper">
        <div className="buttons">취소하기</div>
        <div className="buttons update">수정하기</div>
      </div>
    </div>
  );
};

export default Buttons;
