import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header } from '../components';
import { Signin, Signup } from './auth';
import { AddShop, AddProducts, Result, FranchiseList, Main } from './main';

class App extends Component {
  componentWillReceiveProps = () => {
    this.props.changeRoute(this.props.history.location);
  };

  _renderHeader = () => {
    switch (window.location.pathname) {
      case '/franchise':
      case '/franchise/addShop':
      case '/franchise/addProducts':
        return <Header />;
      default:
        return null;
    }
  };

  render() {
    return (
      <div style={{ height: '100%' }}>
        {this._renderHeader()}
        <Route exact path="/" component={Main} />
        <Route exact path="/auth/signin" component={Signin} />
        <Route exact path="/auth/signup" component={Signup} />
        <Route exact path="/franchise/list" component={FranchiseList} />
        <Route exact path="/franchise/addShop" component={AddShop} />
        <Route exact path="/franchise/addProducts" component={AddProducts} />
        <Route exact path="/result" component={Result} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeRoute: location => dispatch({ type: 'LOCATION_CHANGE', location }),
  };
};

export default withRouter(connect(undefined, mapDispatchToProps)(App));
