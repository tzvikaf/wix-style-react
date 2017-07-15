import React, {Component} from 'react';
import {bool, node, string, object, oneOfType} from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import Child from './animator-child';
import ParentHelper from './services/helpers/parent-helper';
import ChildHelper from './services/helpers/child-helper';

class Animator extends Component {

  items;

  createChildHelper(index) {
    return new ChildHelper(this.props, index, this.items.getLength());
  }

  render() {
    const helper = new ParentHelper(this.props);
    this.items = helper.getItems();
    return (
      <TransitionGroup className={helper.getClass()}>
        {this.items.getList().map((item, index) =>
          <CSSTransition key={index} {...helper.getTransitionGroupProps()}>
            <Child helper={this.createChildHelper(index)}>{item}</Child>
          </CSSTransition>
        )}
      </TransitionGroup>
    );
  }
}

Animator.propTypes = {
  sequence: oneOfType([bool, string]),
  translate: oneOfType([object, bool]),
  children: node
};

export default Animator;
