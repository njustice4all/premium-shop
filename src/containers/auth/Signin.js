import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initSignin } from '../../actions';

class Signin extends Component {

  state = { id: '', password: '' }

  handleID = () => {
    console.log('hey');
  }

  handlePassword = () => {
    console.log('man');
  }

  handleSignin = () => {
    this.props.history.push('franchise/addShop');
    // this.props.initSignin({ id: 'hey', password: 'man' });
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
            <input type="text" className="login-input" onChange={this.handleID} />
            <label className="login-label">PASSWORD</label>
            <input type="text" className="login-input" onChange={this.handlePassword} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    initSignin: (user) => dispatch(initSignin(user))
  };
};

export default connect(undefined, mapDispatchToProps)(Signin);
