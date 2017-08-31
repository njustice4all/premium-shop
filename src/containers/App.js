import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Signin, Signup } from './auth';
import { AddShop, AddProducts } from './main';

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/franchise/addShop" component={AddShop} />
        <Route path="/franchise/addProducts" component={AddProducts} />
      </Switch>
    );
  }
}

export default App;
