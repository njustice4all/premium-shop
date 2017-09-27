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
      <div style={styles.container}>
        <div style={styles.columnWrapper} onClick={this.onAddButtonPress}>
          <div>
            <div style={{ display: 'flex' }}>
              <div style={styles.iconPlus}>+</div>
              <h1 style={styles.title}>가맹점등록</h1>
            </div>
            <div style={{ marginTop: '15px' }}>
              <p style={styles.description}>새로운 가맹점을 등록합니다.</p>
            </div>
          </div>
        </div>
        <div style={{ ...styles.columnWrapper, ...styles.bottom }} onClick={this.onListButtonPress}>
          <div>
            <div>
              <h1 style={styles.title}>가맹점목록</h1>
            </div>
            <div>
              <h2 style={styles.franchiseCount}>876</h2>
            </div>
            <div>
              <p style={styles.description}>등록된 가맹점 정보를 수정합니다.</p>
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%',
    backgroundImage: 'url(/img/img01.png)',
    backgroundSize: 'cover',
  },
  columnWrapper: {
    backgroundColor: '#fc7f1a',
    height: '125px',
    marginBottom: '15px',
    width: '72%',
    display: 'flex',
    alignSelf: 'center',
    borderRadius: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  bottom: {
    backgroundColor: 'white',
    margin: 0,
    color: 'black',
  },
  iconPlus: {
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    fontSize: '30px',
    fontWeight: '100',
    backgroundColor: 'white',
    color: '#fc7f1a',
    borderRadius: '15px',
  },
  title: {
    marginLeft: '10px',
    fontSize: '24px',
    fontWeight: '400',
    lineHeight: '34px',
  },
  description: {
    fontSize: '14px',
    // fontWeight: '300',
  },
  franchiseCount: {
    fontSize: '30px',
    color: '#fc7f1a',
    margin: '5px 0',
  },
};
