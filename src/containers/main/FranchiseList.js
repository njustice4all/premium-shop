import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

const cnt = [1, 2, 3, 4, 5, 6, 7, 8];
const List = () => {
  return (
    <div className="lists">
      <div className="content-wrapper">
        <div className="icon">
          <i className="fa fa-pencil-square-o" aria-hidden="true" />
        </div>
        <div className="image-wrapper">
          <i className="fa fa-camera" aria-hidden="true" />
        </div>
        <div className="describe-wrapper">
          <div className="franchise-name">
            <h1>가맹점명</h1>
          </div>
          <div className="franchise-tag">
            <p>아메리카노, 더치커피, 카페모카</p>
          </div>
          <div className="franchise-address">
            <p>서울특별시 서초구 강남대로 3333-000</p>
          </div>
          <div className="franchise-contact">
            <p>02-000-3232</p>
          </div>
        </div>
      </div>
    </div>
  );
};

class FranchiseList extends Component {
  onBackPress = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { authentication } = this.props;
    // if (!authentication.isLogin) {
    //   return <Redirect to="/auth/signin" />;
    // }

    return (
      <div className="franchise-list">
        <header>
          <span onClick={this.onBackPress}>
            <i className="fa fa-angle-left" aria-hidden="true" />
          </span>
          <h1>가맹점 목록 (000)</h1>
        </header>
        <div className="franchise-list__container">
          <div className="franchise-list__search">
            <span className="icon-wrapper">
              <i className="fa fa-search" aria-hidden="true" />
            </span>
            <input className="search-input-wrapper" type="text" />
          </div>
          <div className="divider">
            <div />
          </div>
          <div className="franchise-list__list-wrapper">
            {cnt.map((franchise, index) => <List key={`franchise-${index}`} />)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
  };
};

export default withRouter(connect(mapStateToProps)(FranchiseList));
