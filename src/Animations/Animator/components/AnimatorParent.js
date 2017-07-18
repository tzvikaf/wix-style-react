import React, {Component} from 'react';
import {bool, node, string, oneOfType, any} from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import formatProps from '../helpers/format-props';
import ClassBuilder from '../builders/class-builder';
import CSSTransitionWrapper from './CSSTransitionWrapper';

class AnimatorParent extends Component {

  animatorProps;

  getClass() {
    const {className} = this.animatorProps;
    return new ClassBuilder()
      .withClassName(className)
      .build();
  }

  render() {
    this.animatorProps = formatProps(this.props);
    const {children} = this.animatorProps;

    return (
      <TransitionGroup className={this.getClass()}>
        {children.map((item, index) =>
          <CSSTransitionWrapper
            key={index}
            index={index}
            {...item.props}
            animatorProps={this.animatorProps}
            >
            {item}
          </CSSTransitionWrapper>
        )}
      </TransitionGroup>
    );
  }
}

AnimatorParent.propTypes = {
  sequence: oneOfType([bool, string]),
  translate: any,
  children: node
};

export default AnimatorParent;
