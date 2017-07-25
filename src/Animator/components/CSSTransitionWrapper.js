import React from 'react';
import {node, number, object} from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import {transitionClassNames} from '../constants/constants';
import {Time} from '../class/time-class';
import Child from './AnimatorChild';
import shouldFlipAnimation from '../helpers/should-flip-animation';

class CSSTransitionWrapper extends React.Component {

  transitionDefault;

  constructor(props) {
    super(props);

    this.transitionDefault = {
      enter: false,
      entering: false,
      exit: false,
      exiting: false
    };

    this.state = {
      sequenceIndex: 0,
      transition: this.transitionDefault
    };
  }

  componentWillReceiveProps(props) {
    const {debug} = props.animatorProps;
    if (debug) {
      this.setDebug(debug);
    }
  }

  setDebug(debug) {
    if (debug === 'enter') {
      this.onEnter();
    } else if (debug === 'entering') {
      this.onEntering();
    } else if (debug === 'leave') {
      this.onExit();
    } else if (debug === 'leaving') {
      this.onExiting();
    }
  }

  updateTransitionState(update = {}) {
    this.setState({
      transition: Object.assign({}, this.transitionDefault, update)
    });
  }

  onEnter() {
    this.setSequenceIndex('enter');
    this.updateTransitionState({enter: true});
  }

  onEntering() {
    this.updateTransitionState({enter: true, entering: true});
  }

  onEntered() {
    this.updateTransitionState();
  }

  onExit() {
    this.setSequenceIndex('exit');
    this.updateTransitionState({exit: true});
  }

  onExiting() {
    this.updateTransitionState({exit: true, exiting: true});
  }

  getTransitionProps() {

    const duration = new Time(this.props.animatorProps).getTotalDuration();

    return {
      enter: !!duration,
      exit: !!duration,
      appear: !!duration,
      timeout: duration,
      classNames: transitionClassNames
    };
  }

  setSequenceIndex(phase) {
    const index = this.props.index + 1;
    const {children, sequence} = this.props.animatorProps;
    const reverseIndex = children.length - this.props.index;
    this.setState({
      sequenceIndex: shouldFlipAnimation(sequence, phase) ? reverseIndex : index
    });
  }

  render() {
    const {children, animatorProps} = this.props;
    const {sequenceIndex} = this.state;
    return (
      <CSSTransition
        {...this.props}
        {...this.getTransitionProps()}
        onEnter={() => this.onEnter()}
        onEntering={() => this.onEntering()}
        onEntered={() => this.onEntered()}
        onExit={() => this.onExit()}
        onExiting={() => this.onExiting()}
        >
        <Child
          transition={this.state.transition}
          sequenceIndex={sequenceIndex}
          animatorProps={animatorProps}
          >
          {children}
        </Child>
      </CSSTransition>
    );
  }
}

CSSTransitionWrapper.propTypes = {
  index: number,
  children: node,
  animatorProps: object
};

export default CSSTransitionWrapper;
