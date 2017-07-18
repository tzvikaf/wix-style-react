import React from 'react';
import {node, object, number} from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import {transitionClassNames} from '../constants/constants';
import {Time} from '../class/time-class';
import Child from './AnimatorChild';
import shouldFlipAnimation from '../helpers/should-flip-animation';

class CSSTransitionWrapper extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sequenceIndex: 0
    };
  }

  onEnter() {
    this.setSequenceIndex('enter');
  }

  onExit() {
    this.setSequenceIndex('exit');
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
        onExit={() => this.onExit()}
        >
        <Child sequenceIndex={sequenceIndex} animatorProps={animatorProps}>{children}</Child>
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
