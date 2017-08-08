import React, {Component} from 'react';
import {node, bool, oneOf} from 'prop-types';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import slideLeft from './SlideLeftAnimation.scss';
import slideRight from './SlideRightAnimation.scss';

export const SlideDirection = {
  left: 'left',
  right: 'right'
};

class SlideAnimation extends Component {
  render() {
    const {animateAppear, animateEnter, animateLeave, children, direction} = this.props;
    const animationDuration = 300; // Synced with SlideAnimation.scss file
    const transitionName = direction === SlideDirection.left ? slideLeft : slideRight;
    return (
      <ReactCSSTransitionGroup
        transitionAppear={animateAppear}
        transitionLeave={animateLeave}
        transitionAppearTimeout={animateAppear ? animationDuration : 0}
        transitionEnterTimeout={animateEnter ? animationDuration : 0}
        transitionLeaveTimeout={animateLeave ? animationDuration : 0}
        transitionName={transitionName}
        >
        {children}
      </ReactCSSTransitionGroup>
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
