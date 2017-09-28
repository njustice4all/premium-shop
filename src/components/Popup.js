import React from 'react';

const Popup = ({ onBackButtonPress }) => {
  return (
    <div className="popup-bg">
      <div className="popup-wrapper">
        <div className="content-wrapper">
          <h1>가맹점 정보 미입력</h1>
          <p>가맹점 정보 입력 필수</p>
        </div>
        <div className="button-wrapper" onClick={onBackButtonPress}>
          돌아가기
        </div>
      </div>
    </div>
  );
};

export default Popup;
