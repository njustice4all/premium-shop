import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initSignin } from '../../actions';

class Signin extends Component {

  state = { id: '', password: '' }

  setStateByKey = (key, value) => {
    this.setState({ [key]: value });
  }

  handleSignin = () => {
    const { initSignin, history } = this.props;
    const { id, password } = this.state;
    initSignin({ id, password }).then((value) => value ? history.push('franchise/addShop') : null);
  }

  handleSignup = () => {
    this.props.history.push('auth/signup');
  }

  render() {
    return (
      <div className="mobile-auth-wrapper">
        <div className="login-form">
          <h1>SIGN IN</h1>
          <div>
            <label className="login-label">ID</label>
            <input
              type="text"
              className="login-input"
              onChange={(e) => this.setStateByKey('id', e.target.value)}
            />
            <label className="login-label">PASSWORD</label>
            <input
              type="password"
              className="login-input"
              onChange={(e) => this.setStateByKey('password', e.target.value)}
            />
            <button className="btn-login" onClick={() => this.handleSignin()}>
              Enter
            </button>
          </div>
          <button className="btn-modal" onClick={() => this.handleSignup()}>
            SIGN UP
          </button>
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
