import React, {Component} from 'react';
import {bool, node, string, oneOfType, any} from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import Child from './animator-child';
import ParentHelper from './services/helpers/parent-helper';
import animationPhase from './services/animation-phase';

class Animator extends Component {

  onEnter() {
    animationPhase.set('enter');
  }

  onExit() {
    animationPhase.set('exit');
  }

  render() {
    const helper = new ParentHelper(this.props);
    const className = helper.getClass();
    const cssTransitionProps = helper.getTransitionGroupProps();
    return (
      <TransitionGroup className={className}>
        {React.Children.toArray(this.props.children).map((item, index) =>
          <CSSTransition
            key={index}
            {...cssTransitionProps}
            onEnter={() => this.onEnter()}
            onExit={() => this.onExit()}
            >
            <Child helper={helper.getChildHelper(index, item)} animationPhase={animationPhase}>{item}</Child>
          </CSSTransition>
        )}
      </TransitionGroup>
    );
  }
}

Animator.propTypes = {
  sequence: oneOfType([bool, string]),
  translate: any,
  children: node
};

export default Animator;
