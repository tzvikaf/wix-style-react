import React, {Component} from 'react';
import {bool, node, string, oneOfType, any} from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import formatProps from '../helpers/format-props';
import CSSTransitionWrapper from './CSSTransitionWrapper';

class AnimatorParent extends Component {

  animatorProps;

  render() {
    const {className, dataHook} = this.props;
    this.animatorProps = formatProps(this.props);
    return (
      <TransitionGroup data-hook={dataHook} className={className}>
        {this.animatorProps.children.map((item, index) =>
          <CSSTransitionWrapper
            key={item.key || index}
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
  children: node,
  className: any,
  dataHook: any
};

export default AnimatorParent;
