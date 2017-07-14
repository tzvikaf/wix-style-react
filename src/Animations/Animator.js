import React, {Component} from 'react';
import {bool, node, string, object, oneOfType} from 'prop-types';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Child from './animator-child';
import ParentHelper from './services/helpers/parent-helper';
import ChildHelper from './services/helpers/child-helper';
import {transitionName} from './services/constants/constants';

class Animator extends Component {

  items;

  createChildHelper(index) {
    return new ChildHelper(this.props, index, this.items.getLength());
  }

  render() {
    const helper = new ParentHelper(this.props);
    const duration = helper.getDuration();
    this.items = helper.getItems();

    return (
      <div className={helper.getClass()}>
        {this.items.getList().map((item, index) =>
          <ReactCSSTransitionGroup
            key={index}
            transitionEnter={!!duration}
            transitionLeave={!!duration}
            transitionEnterTimeout={duration}
            transitionLeaveTimeout={duration}
            transitionName={transitionName}
            >
            {!!item && <Child
              index={index}
              helper={this.createChildHelper(index)}
              >
              {item}
              </Child>
            }
          </ReactCSSTransitionGroup>
        )}
      </div>
    );
  }
}

Animator.propTypes = {
  timing: string,
  sequence: oneOfType([bool, string]),
  translate: oneOfType([object, bool]),
  children: node
};

export default Animator;
