import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

class Main extends Component {
  onAddButtonPress = () => this.props.history.push('/franchise/addShop');

  onListButtonPress = () => this.props.history.push('/franchise/list');

  render() {
    const { authentication } = this.props;
    if (!authentication.isLogin) {
      return <Redirect to="/auth/signin" />;
    }

    return (
      <div style={styles.container}>
        <div
          style={{ ...styles.columnWrapper, ...styles.columnFirst }}
          onClick={this.onAddButtonPress}
        >
          <h1>
            <i className="fa fa-plus" aria-hidden="true" />
          </h1>
          <h1 style={styles.title}>가맹점 등록</h1>
          <p>새로운 가맹점을 등록합니다.</p>
        </div>
        <div style={styles.columnWrapper} onClick={this.onListButtonPress}>
          <h1 style={styles.count}>121</h1>
          <h1 style={styles.title}>가맹점 목록</h1>
          <p>등록된 가맹점 정보를 수정합니다.</p>
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%',
  },
  columnWrapper: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  columnFirst: {
    backgroundColor: '#222831',
    color: 'white',
  },
  icon: {
    fontSize: '40px',
  },
  count: {
    color: '#b02325',
    fontSize: '40px',
  },
  title: {
    margin: '3% 0',
  },
  description: {},
};
