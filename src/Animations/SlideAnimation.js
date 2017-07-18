import React, {Component} from 'react';
import {node, bool, oneOf} from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import slideLeft from './SlideLeftAnimation.scss';
import slideRight from './SlideRightAnimation.scss';

export const SlideDirection = {
  left: 'left',
  right: 'right'
};

class SlideAnimation extends Component {
  render() {
    const {animateEnter, animateLeave, children, direction} = this.props;
    const animationDuration = 3000; // Synced with SlideAnimation.scss file
    const transitionName = direction === SlideDirection.left ? slideLeft : slideRight;
    let items = children ? children : [];
    items = Array.isArray(items) ? items : [items];

    return (
      <TransitionGroup>
        {items.map((item, index) =>
          <CSSTransition
            key={index}
            timeout={{
              enter: animateEnter ? animationDuration : 0,
              exit: animateLeave ? animationDuration : 0,
              appear: 0
            }}
            classNames={transitionName}
            >
            {item}
          </CSSTransition>)}
      </TransitionGroup>
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
