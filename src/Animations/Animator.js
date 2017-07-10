import React, {Component} from 'react';
import css from './Animator.scss';
import {bool, node, string} from 'prop-types';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Animator extends Component {

  transitionName;
  durationMap;
  defaults;
  children;

  constructor(props) {
    super(props);

    this.defaults = {
      duration: 300,
      sequenceDelayDuration: 80
    };

    this.transitionName = {
      enter: css.enter,
      enterActive: css.enterActive,
      leave: css.leave,
      leaveActive: css.leaveActive
    };

    this.durationMap = {
      micro: 120,
      small: 150,
      medium: 200,
      large: 300
    };

    this.cssProps = ['opacity', 'scale'];
    // translate prop is unique

  }

  getClasses() {
    const {timing = 'large'} = this.props;
    return `${css.child} ${this.getCssClassString()} ${css[timing]}`;
  }

  getDurationTime() {
    const {timing, sequenceDelay} = this.props;
    const duration = timing ? this.durationMap[timing] : this.defaults.duration;
    const sequenceDelayDuration = timing && sequenceDelay && this.children.length > 1 ? this.children.length * this.defaults.sequenceDelayDuration : 0;
    return this.shouldAnimate() ? duration + sequenceDelayDuration : 0;
  }

  shouldAnimate() {
    const {translate} = this.props;
    return this.getCssAttributeList().length || translate;
  }

  getCssClassString() {
    return this.getCssAttributeList().reduce((str, key) => `${str} ${css[key]}`, '');
  }

  getCssAttributeList() {
    return Object.entries(this.props)
      .filter(([key]) => this.cssProps.indexOf(key) > -1)
      .reduce((list, [key, value]) => {
        return value ? [...list, key] : list;
      }, []);
  }

  createChild(child) {
    const {translate} = this.props;
    return (
      <div className={this.getClasses()}>
        {translate ? <div className={css.translate}>{child}</div> : child}
      </div>
    );
  }

  render() {
    const {children = [], sequenceDelay} = this.props;
    this.children = Array.isArray(children) ? children : [children];
    const duration = this.getDurationTime();
    return (
      <div className={sequenceDelay && css.sequenceDelay}>
        {this.children.map((child, index) =>
          <ReactCSSTransitionGroup
            key={index}
            transitionEnter={!!duration}
            transitionLeave={!!duration}
            transitionEnterTimeout={duration}
            transitionLeaveTimeout={duration}
            transitionName={this.transitionName}
            >
            {!!child && this.createChild(child)}
          </ReactCSSTransitionGroup>
        )}
      </div>
    );
  }
}

Animator.propTypes = {
  timing: string,
  sequenceDelay: bool,
  translate: bool,
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
