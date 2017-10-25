// @flow

import React from 'react';
import classNames from 'classnames';

type Props = {
  handleConfirm: Function,
  handleCancel: Function,
  errors: boolean,
  editMode: boolean,
};

const Buttons = ({ handleConfirm, handleCancel, errors, editMode }: Props) => {
  return (
    <div style={{ padding: '0 10px' }}>
      <div className="divider">
        <div />
      </div>
      <div className="survay__btn__confirm__wrapper">
        <div className="buttons" onClick={handleCancel}>
          취소하기
        </div>
        <div className={classNames('buttons update')} onClick={handleConfirm}>
          {editMode ? '수정하기' : '등록하기'}
        </div>
      </div>
    </div>
  );
};

export default Buttons;
