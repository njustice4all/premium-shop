import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from '../components/Header';
import { Signin, Signup } from './auth';
import { AddShop, AddProducts } from './main';

class App extends Component {

  _renderHeader = () => {
    switch (window.location.pathname) {
      case '/':
      case '/auth/signup':
        return null;
      default:
        return <Header />;
    }
  }

  render() {
    return (
      <div>
        {this._renderHeader()}
        <Route exact path="/" component={Signin} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/franchise/addShop" component={AddShop} />
        <Route path="/franchise/addProducts" component={AddProducts} />
      </div>
    );
  }
}

export default App;
