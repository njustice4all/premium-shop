import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

class FranchiseList extends Component {
  render() {
    const { authentication } = this.props;
    if (!authentication.isLogin) {
      return <Redirect to="/auth/signin" />;
    }

    return <h1>리스트</h1>;
  }
}

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
  };
};

export default withRouter(connect(mapStateToProps)(FranchiseList));
