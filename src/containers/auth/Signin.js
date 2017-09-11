import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initSignin } from '../../actions';

class Signin extends Component {

  state = { email: '', password: '' }

  setStateByKey = (key, value) => {
    this.setState({ [key]: value });
  }

  handleSignin = () => {
    const { initSignin, history } = this.props;
    const { email, password } = this.state;
    initSignin({ email, password })
      .then(value => value ? history.push('franchise/addShop') : null);
  }

  handleSignup = () => {
    this.props.history.push('auth/signup');
  }

  render() {
    return (
      <div className="mobile-auth-wrapper">
        <div className="login-form">
          <h1>로그인</h1>
          <div>
            <label className="login-label">이메일</label>
            <input
              type="email"
              className="login-input"
              onChange={(e) => this.setStateByKey('email', e.target.value)}
            />
            <label className="login-label">비밀번호</label>
            <input
              type="password"
              className="login-input"
              onChange={(e) => this.setStateByKey('password', e.target.value)}
            />
            <button className="btn-login" onClick={() => this.handleSignin()}>
              로그인
            </button>
            <button className="btn-login signup" onClick={() => this.handleSignup()}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.authentication.isLogin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initSignin: (user) => dispatch(initSignin(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
