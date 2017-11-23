import React, { Component } from 'react';
import { Motion, spring, presets } from 'react-motion';

const withAnimated = NeedAnimationComponent => {
  return class WrappedAnimation extends Component {
    render() {
      return (
        <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1, presets.gentle) }}>
          {value => <NeedAnimationComponent {...this.props} {...value} />}
        </Motion>
      );
    }
  };
};

export default withAnimated;
