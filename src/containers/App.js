import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import localforage from 'localforage';

import { Signin, Signup } from './auth';
import { autoLogin } from '../actions';

import { Header } from '../components';
import { AddShop, AddProducts, Result, FranchiseList, Main } from './main';

class App extends Component {
  componentDidMount = () => {
    localforage.getItem('userInfo').then(userInfo => {
      if (userInfo) {
        this.props.autoLogin(userInfo);
      }
    });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.ui.get('address') !== this.props.ui.get('address')) {
      return;
    }

    this.props.changeRoute(this.props.history.location);
  };

  _renderHeader = () => {
    switch (window.location.pathname) {
      case '/auth/signin':
      case '/auth/signup':
      case '/franchise/list':
      case '/result':
      case '/':
        return null;
      default:
        return <Header />;
    }
  };

  render() {
    const isPopup = this.props.ui.get('address');

    return (
      <div className={isPopup ? 'app-container disable' : 'app-container'}>
        {this._renderHeader()}
        <Route exact path="/" component={Main} />
        <Route exact path="/auth/signin" component={Signin} />
        <Route exact path="/auth/signup" component={Signup} />
        <Route
          exact
          path="/franchise/list"
          component={FranchiseList}
          onEnter={() => console.log('hi')}
        />
        <Route exact path="/franchise/addShop" component={AddShop} />
        <Route
          exact
          path="/franchise/setShop/:shopSequence"
          render={props => <AddShop editMode {...props} />}
        />
        <Route exact path="/franchise/addProducts" component={AddProducts} />
        <Route
          exact
          path="/franchise/setProducts/:shopSequence"
          render={props => <AddProducts editMode {...props} />}
        />
        <Route exact path="/result" component={Result} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.get('ui'),
});

const mapDispatchToProps = dispatch => ({
  changeRoute: location => dispatch({ type: 'LOCATION_CHANGE', location }),
  autoLogin: userInfo => dispatch(autoLogin(userInfo)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
