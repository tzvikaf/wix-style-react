import React, {Component} from 'react';
import css from './Animator.scss';
import {bool, node, string, object, oneOfType} from 'prop-types';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import CssClass from './services/css-class';
import Duration from './services/duration';
import Child from './animator-child';

class Animator extends Component {

  transitionName;
  children;

  constructor(props) {
    super(props);
    this.duration = new Duration();
    this.cssClass = new CssClass();

    this.transitionName = {
      enter: css.enter,
      enterActive: css.enterActive,
      leave: css.leave,
      leaveActive: css.leaveActive
    };

  }

  render() {
    const {children = []} = this.props;
    this.children = Array.isArray(children) ? children : [children];
    const duration = this.duration.get(this.props);
    const childrenLength = this.children.length;
    return (
      <div className={this.cssClass.getParent(this.props)}>
        {this.children.map((child, index) =>
          <ReactCSSTransitionGroup
            key={index}
            transitionEnter={!!duration}
            transitionLeave={!!duration}
            transitionEnterTimeout={duration}
            transitionLeaveTimeout={duration}
            transitionName={this.transitionName}
            >
            {!!child && <Child index={index} childrenLength={childrenLength} {...this.props}>{child}</Child>}
          </ReactCSSTransitionGroup>
        )}
      </div>
    );
  }
}

Animator.propTypes = {
  timing: string,
  sequenceDelay: bool,
  translate: oneOfType([object, bool]),
  children: node
};
//
// FadeAnimation.defaultProps = {
//   animateAppear: true,
//   animateEnter: true,
//   animateLeave: true,
//   children: null
// };
//
export default Animator;
