import React, { Component } from 'react';

class Result extends Component {

  render() {
    return (
      <div>
        <h1 style={style}>감사합니다.</h1>
      </div>
    );
  }
}

export default Result;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
