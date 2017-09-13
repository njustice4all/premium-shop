import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { initSignup } from '../../actions';

const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

class Signup extends Component {

  state = { email: '', password: '', confirmPassword: '', alert: false }

  handleEmailChange = (e) => {
    if (!regex.test(e.target.value)) {
      this.email.className = 'login-input wrong';
      this.setState((prevState) => ({ alert: true }));
    } else {
      this.email.className = 'login-input';
      this.setState((prevState) => ({ alert: false }));
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
    this.setState({ confirmPassword: e.target.value });
  }

  onConfirm = () => {
    const { initSignup, history } = this.props;
    const { email, password, confirmPassword } = this.state;
    if (!regex.test(email)) return;
    if (password.trim().length < 6) return;
    if (email.trim().length > 0 && (password === confirmPassword)) {
      initSignup({ email, password }).then((value) => {
        localStorage.setItem('email', email);
        return value ? history.push('/franchise/addShop') : null;
      });
    }
  }

  render() {
    const { alert } = this.state;

    return (
      <div className="mobile-auth-wrapper" style={{ position: 'relative' }}>
        <div className="login-form">
          <h1>회원가입</h1>
          <div>
            <label className="login-label" style={{ display: 'inline' }}>이메일</label>
            <span className={classNames('msg-alert', { on: alert })}>
              올바른 이메일 형식이 아닙니다.
            </span>
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

const mapDispatchToProps = (dispatch) => {
  return {
    initSignup: (user) => dispatch(initSignup(user))
  };
};

export default connect(undefined, mapDispatchToProps)(Signup);
