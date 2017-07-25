import React, {Component} from 'react';
import {bool, node, string, oneOfType, any, boolean} from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import formatProps from '../helpers/format-props';
import CSSTransitionWrapper from './CSSTransitionWrapper';

class AnimatorParent extends Component {

  animatorProps;

  isShowByProp() {
    const {in: _in} = this.props;
    return ((_in === undefined) || !!_in);
  }

  render() {
    const {className, dataHook} = this.props;
    this.animatorProps = formatProps(this.props);
    return (
      <TransitionGroup data-hook={dataHook} className={className}>
        {this.isShowByProp() && this.animatorProps.children.map((item, index) =>
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
  in: boolean,
  dataHook: any
};

export default AnimatorParent;
