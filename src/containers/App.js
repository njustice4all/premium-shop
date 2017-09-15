import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Header } from '../components';
import { Signin, Signup } from './auth';
import { AddShop, AddProducts, Result } from './main';

class App extends Component {
  _renderHeader = () => {
    switch (window.location.pathname) {
      case '/franchise/addShop':
      case '/franchise/addProducts':
        return <Header />;
      default:
        return null;
      // case '/':
      // case '/auth/signup':
      // case '/result':
      //   return null;
      // default:
      //   return <Header />;
    }
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        {this._renderHeader()}
        <Route exact path="/" component={Signin} />
        <Route exact path="/auth/signup" component={Signup} />
        <Route exact path="/franchise/addShop" component={AddShop} />
        <Route exact path="/franchise/addProducts" component={AddProducts} />
        <Route exact path="/result" component={Result} />
      </div>
    );
  }
}

export default App;
