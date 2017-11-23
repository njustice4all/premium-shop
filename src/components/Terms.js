import React from 'react';

import withAnimated from '../containers/withAnimated';

const Terms = ({ toggleVisibilityTermsComponent, opacity }) => (
  <div className="terms-container" style={{ opacity: opacity }}>
    <div className="terms-wrapper">
      <header className="terms-side">개인정보취급방침</header>
      <div className="terms-content-wrapper">
        <p>android.permission.INTERNET</p>
        <p>android.permission.SYSTEM_ALERT_WINDOW</p>
        <ul style={{ listStylePosition: 'inside' }}>
          <li>
            android.permission.CAMERA
            <p>
              이 응용 프로그램은 휴대폰 단말기의 “카메라”를 사용하여 “카메라 프리뷰 또는 카메라 촬영”기능을 사용합니다. 따라서, 이 앱에 기기의 카메라 사용 권한을
              부여합니다
            </p>
          </li>
          <li>
            android.permission.READ_EXTERNAL_STORAGE
            <p>촬영한 가맹점 정보나 판매상품을 앱에 업로드하기위해 필요한 권한</p>
          </li>
          <li>android.permission.READ_PHONE_STATE</li>
        </ul>
        <p />
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
        <p>으아아앙아앙아ㅏ아아아아아아암ㅇㄹㅁㄴ아람아람알ㄴㅇ마</p>
      </div>
      <div className="terms-side terms-confirm" onClick={toggleVisibilityTermsComponent}>
        확 인
      </div>
    </div>
  </div>
);

export default withAnimated(Terms);
