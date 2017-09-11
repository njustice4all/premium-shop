import React, { Component } from 'react';

export default class Signup extends Component {

  state = { email: '', password: '' }

  handleEmailChange = (e) => {
    const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    if (!regex.test(e.target.value)) {
      this.email.className = 'login-input wrong';
    } else {
      this.email.className = 'login-input';
    }
    this.setState({ email: e.target.value });
  }

  handlePasswordChange = (e) => {
    if (e.target.value.trim().length < 6) {
      this.password.className = 'login-input wrong';
    } else {
      this.password.className = 'login-input';
    }
    this.setState({ password: e.target.value });
  }

  handleConfirmPassword = (e) => {
    const { password } = this.state;
    if (e.target.value !== password) {
      this.confirmPassword.className = 'login-input wrong';
    } else {
      this.confirmPassword.className = 'login-input';
    }
  }

  onConfirm = () => {
    console.log(this.props);
  }

  render() {
    return (
      <div className="mobile-auth-wrapper">
        <div className="login-form">
          <h1>회원가입</h1>
          <div>
            <label className="login-label">이메일</label>
            <input
              ref={(email) => this.email = email}
              type="email"
              className="login-input"
              onChange={(e) => this.handleEmailChange(e)}
            />
            <label className="login-label">비밀번호</label>
            <input
              ref={(password) => this.password = password}
              type="password"
              className="login-input"
              onChange={(e) => this.handlePasswordChange(e)}
            />
            <label className="login-label">비밀번호 확인</label>
            <input
              ref={(confirmPassword) => this.confirmPassword = confirmPassword}
              type="password"
              className="login-input"
              onChange={(e) => this.handleConfirmPassword(e)}
            />
            <button className="btn-login" onClick={() => this.onConfirm()}>
              회원가입하기
            </button>
          </div>
        </div>
      </div>
    )
  }
};
