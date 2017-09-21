import React from 'react';

const Popup = ({ onBackButtonPress }) => {
  return (
    <div className="popup-bg">
      <div className="popup-wrapper">
        <div className="content-wrapper">가맹점 정보를 입력해야합니다.</div>
        <div className="button-wrapper" onClick={onBackButtonPress}>
          돌아가기
        </div>
      </div>
    </div>
  );
};

export default Popup;
