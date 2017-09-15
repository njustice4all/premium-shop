import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initSignin } from '../../actions';

import { Loading } from '../../components';

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: document.cookie.split('email=')[1] || '',
      password: '',
      isRemember: document.cookie.split('email=')[1] ? true : false,
    };
  }

  setStateByKey = (key, value) => {
    this.setState({ [key]: value });
  };

  handleSignin = () => {
    const { initSignin, history } = this.props;
    const { email, password, isRemember } = this.state;
    if (email.trim().length === 0 && password.trim().length === 0) return;

    initSignin({ email, password }).then(value => {
      // localStorage.setItem('email', email);
      if (isRemember) {
        document.cookie = `email=${email}`;
      }
      return value ? history.push('franchise/addShop') : null;
    });
  };

  handleSignup = () => this.props.history.push('auth/signup');

  handleCheckBox = () => {
    this.setState(prevState => ({ isRemember: !prevState.isRemember }));
  };

  render() {
    const { email, isRemember } = this.state;

    return (
      <div className="mobile-auth-wrapper">
        {this.props.authentication.status.isFetching ? <Loading /> : null}
        <div className="greeting-wrapper">
          <div style={{ width: '41px', height: '36px' }}>
            <img src="/img/icon06.png" alt="" />
          </div>
          <div style={{ marginTop: '30px' }}>
            <h1 style={{ fontWeight: 'normal' }}>단골 프로젝트</h1>
          </div>
        </div>
        <div className="login-form">
          <div>
            <label className="login-label login-email">이메일</label>
            <label className="login-label remember-email">
              <span>이메일 기억하기</span>
              <input type="checkbox" checked={isRemember} onChange={this.handleCheckBox} />
            </label>
            <input
              type="email"
              className="login-input"
              onChange={e => this.setStateByKey('email', e.target.value)}
              defaultValue={email}
            />
            <label className="login-label">비밀번호</label>
            <input
              type="password"
              className="login-input"
              onChange={e => this.setStateByKey('password', e.target.value)}
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
}

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initSignin: user => dispatch(initSignin(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
