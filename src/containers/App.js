import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from '../components/Header';
import { Signin, Signup } from './auth';
import { AddShop, AddProducts } from './main';

class App extends Component {

  render() {
    return (
      <div>
        {window.location.pathname === '/' ? null : <Header />}
        <Route exact path="/" component={Signin} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/franchise/addShop" component={AddShop} />
        <Route path="/franchise/addProducts" component={AddProducts} />
      </div>
    );
  }
}

export default App;
