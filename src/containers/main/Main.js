import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { initGetShopLists } from '../../actions';
import { Loading } from '../../components';

class Main extends Component {
  componentDidMount = () => {
    const { authentication, initGetShopLists } = this.props;
    if (authentication.isLogin) {
      initGetShopLists(authentication.seq);
    }
  };

  onAddButtonPress = () => this.props.history.push('/franchise/addShop');

  onListButtonPress = () => this.props.history.push('/franchise/list');

  render() {
    const { authentication, franchiseLists } = this.props;
    if (!authentication.isLogin) {
      return <Redirect to="/auth/signin" />;
    }

    return (
      <div className="main__container">
        {this.props.franchiseLists.status.isFetching ? <Loading /> : null}
        <div className="column-wrapper" onClick={this.onAddButtonPress}>
          <div>
            <div style={{ display: 'flex' }}>
              <div className="icon-plus">
                <i className="fa fa-plus" aria-hidden="true" />
              </div>
              <h1 className="title">가맹점등록</h1>
            </div>
            <div style={{ marginTop: '15px' }}>
              <p className="description">새로운 가맹점을 등록합니다.</p>
            </div>
          </div>
        </div>
        <div className="column-wrapper bottom" onClick={this.onListButtonPress}>
          <div>
            <div>
              <h1 className="title">가맹점목록</h1>
            </div>
            <div>
              <h2 className="franchise-count">
                {franchiseLists.lists.length}
              </h2>
            </div>
            <div>
              <p className="description">등록된 가맹점 정보를 수정합니다.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
    franchiseLists: state.franchiseLists,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initGetShopLists: seq => dispatch(initGetShopLists(seq)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
