import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import localforage from 'localforage';

import { initSignin } from '../../actions';

import { Loading } from '../../components';

class Signin extends Component {
  state = {
    email: '',
    password: '',
    autoLogin: false,
    memberSequence: '',
  };

  componentDidMount = () => {
    localforage.getItem('userInfo').then(userInfo => {
      if (userInfo) {
        // this.setState({ ...userInfo });
        this.props.history.push('/');
      }
    });
  };

  setStateByKey = (key, value) => this.setState({ [key]: value });

  handleSignin = () => {
    const { initSignin, history } = this.props;
    const { email, password, autoLogin } = this.state;
    if (email.trim().length === 0 && password.trim().length === 0) return;

    initSignin({ email, password }).then(result => {
      if (autoLogin) {
        localforage.setItem('userInfo', {
          email: email,
          autoLogin: true,
          memberSequence: result.memberSequence,
        });
      } else if (!autoLogin) {
        localforage.clear();
      }

      return result ? history.push('/') : null;
    });
  };

  handleSignup = () => this.props.history.push('/auth/signup');

  handleCheckBox = () => {
    this.setState(prevState => ({ autoLogin: !prevState.autoLogin }));
  };

  render() {
    const { authentication } = this.props;
    const { email, autoLogin } = this.state;

    return (
      <div className="mobile-auth-wrapper">
        {authentication.getIn(['status', 'isFetching']) ? <Loading /> : null}
        <div className="greeting-wrapper">
          <div>
            <h1 style={{ fontWeight: 'normal' }}>단골프리미엄</h1>
          </div>
        </div>
        <div className="login-form">
          <div>
            <label className="login-label login-email">이메일</label>
            <label className="login-label remember-email">
              <span>자동로그인</span>
              <input type="checkbox" checked={autoLogin} onChange={this.handleCheckBox} />
            </label>
            <input
              type="email"
              className="login-input"
              onChange={e => this.setStateByKey('email', e.target.value)}
              value={email}
            />
            <label className="login-label">비밀번호</label>
            <input
              type="password"
              className="login-input"
              onChange={e => this.setStateByKey('password', e.target.value)}
            />
            <button className="btn-login" onClick={this.handleSignin}>
              로그인
            </button>
            <button className="btn-login signup" onClick={this.handleSignup}>
              회원가입
            </button>
          </div>
          <div className="franchise-count-wrapper">
            <p>
              가맹점 등록수 <span>122222</span>개
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.get('authentication'),
});

const mapDispatchToProps = dispatch => ({
  initSignin: user => dispatch(initSignin(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
