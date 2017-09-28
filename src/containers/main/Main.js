import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

class Main extends Component {
  onAddButtonPress = () => this.props.history.push('/franchise/addShop');

  onListButtonPress = () => this.props.history.push('/franchise/list');

  render() {
    // const { authentication } = this.props;
    // if (!authentication.isLogin) {
    //   return <Redirect to="/auth/signin" />;
    // }

    return (
      <div className="main__container">
        <div className="column-wrapper" onClick={this.onAddButtonPress}>
          <div>
            <div style={{ display: 'flex' }}>
              <div className="icon-plus">+</div>
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
              <h2 className="franchise-count">876</h2>
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
  };
};

export default withRouter(connect(mapStateToProps)(Main));
