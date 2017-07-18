import React, {Component} from 'react';
import {node, bool, oneOf} from 'prop-types';
import Animator from './Animator';

export const SlideDirection = {
  left: 'left',
  right: 'right'
};

class SlideAnimation extends Component {
  render() {
    const {children, direction} = this.props;
    return (
      <Animator translate={{to: direction}}>
        {children}
      </Animator>
    );
  }
}

SlideAnimation.propTypes = {
  direction: oneOf([
    SlideDirection.left,
    SlideDirection.right
  ]),
  animateAppear: bool,
  animateEnter: bool,
  animateLeave: bool,
  children: node
};

SlideAnimation.defaultProps = {
  direction: SlideDirection.left,
  animateAppear: true,
  animateEnter: true,
  animateLeave: true,
  children: null
};

export default SlideAnimation;
