import React from 'react';
import {node, object, number} from 'prop-types';
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
      entered: false,
      exit: false
    };

    this.state = {
      sequenceIndex: 0,
      transition: this.transitionDefault
    };
  }

  componentWillReceiveProps(props) {
    const {debug} = props.animatorProps;
    if (debug) {
      if (debug === 'enter' || debug === 'entering') {
        this.updateTransitionState({enter: true});
      } else if (debug === 'leaving') {
        this.updateTransitionState({exit: true});
      } else {
        this.updateTransitionState();
      }
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

  onEntered() {
    this.updateTransitionState({entered: true});
  }

  onExit() {
    this.setSequenceIndex('exit');
    this.updateTransitionState({exit: true});
  }

  getTransitionProps() {

    const duration = new Time(this.props.animatorProps).getTotalDuration();

    return {
      enter: !!duration,
      exit: !!duration,
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
        onEntered={() => this.onEntered()}
        onExit={() => this.onExit()}
        >
        <Child transition={this.state.transition} sequenceIndex={sequenceIndex} animatorProps={animatorProps}>{children}</Child>
      </CSSTransition>
    );
  }
}

CSSTransitionWrapper.propTypes = {
  animatorProps: object,
  index: number,
  children: node
};

export default CSSTransitionWrapper;
