import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Result extends Component {
  onBack = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { authentication } = this.props;
    // if (!authentication.get('isLogin')) {
    //   return <Redirect to="/auth/signin" />;
    // }

    return (
      <div className="result-wrapper center">
        <div className="result-text-wrapper center">
          <h1>감사합니다</h1>
          <h1 className="result-text" onClick={this.onBack}>
            돌아가기
          </h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authentication: state.get('authentication'),
  };
};

export default withRouter(connect(mapStateToProps)(Result));
