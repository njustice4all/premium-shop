import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import isLogged from '../../utils';

class Result extends Component {
  onBack = () => {
    const { history } = this.props;
    // localStorage.clear();
    // document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    history.push('/franchise/addShop');
  };

  render() {
    if (!isLogged()) return <Redirect to="/" />;

    return (
      <div style={styles.wrapper}>
        <h1>감사합니다</h1>
        <h1 style={styles.text} onClick={() => this.onBack()}>
          돌아가기
        </h1>
      </div>
    );
  }
}

export default Result;

const styles = {
  wrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  text: {
    marginTop: '10%',
    color: '#8b41d4',
  },
};
