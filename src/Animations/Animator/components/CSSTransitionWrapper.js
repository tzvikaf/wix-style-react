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
      entered: false,
      exit: false,
      exiting: false
    };

    this.state = {
      sequenceIndex: 0,
      transition: this.transitionDefault,
      dimensions: {
        height: 0,
        width: 0
      }
    };
  }

  componentWillReceiveProps(props) {
    const {debug} = props.animatorProps;
    if (debug) {
      if (debug === 'enter') {
        this.updateTransitionState({enter: true});
      } else if (debug === 'entering') {
        this.updateTransitionState({enter: true, entering: true});
      } else if (debug === 'leave') {
        this.updateTransitionState({exit: true});
      } else if (debug === 'leaving') {
        this.updateTransitionState({exit: true, exiting: true});
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

  onEntering(node) {
    this.setDimension(node);
    this.updateTransitionState({enter: true, entering: true});
  }

  onEntered() {
    this.updateTransitionState({entered: true});
  }

  onExit(node) {
    this.setDimension(node);
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

  setDimension(node) {
    const {offsetHeight: height, scrollWidth: width} = node.children[0].children[0];
    const dimensions = {height, width};
    this.setState({dimensions});
  }

  render() {
    const {children, animatorProps} = this.props;
    const {sequenceIndex} = this.state;
    return (
      <CSSTransition
        {...this.props}
        {...this.getTransitionProps()}
        onEnter={() => this.onEnter()}
        onEntering={node => this.onEntering(node)}
        onEntered={() => this.onEntered()}
        onExit={node => this.onExit(node)}
        onExiting={() => this.onExiting()}
        >
        <Child
          dimensions={this.state.dimensions}
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
