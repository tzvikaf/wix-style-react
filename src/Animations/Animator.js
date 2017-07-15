import React, {Component} from 'react';
import {bool, node, string, object, oneOfType} from 'prop-types';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
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
      <span className={helper.getClass()}>
        {this.items.getList().map((item, index) =>
          <ReactCSSTransitionGroup key={index} {...helper.getTransitionGroupProps()}>
            {!!item && <Child helper={this.createChildHelper(index)}>
              {item}
              </Child>
            }
          </ReactCSSTransitionGroup>
        )}
      </span>
    );
  }
}

Animator.propTypes = {
  sequence: oneOfType([bool, string]),
  translate: oneOfType([object, bool]),
  children: node
};

export default Animator;
