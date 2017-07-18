import React from 'react';
import {node} from 'prop-types';

class AnimatorContent extends React.Component {

  cleanProps(props) {
    const newProps = Object.assign({}, props);
    delete newProps.childClassName;
    delete newProps.childStyle;
    delete newProps.debug;
    return newProps;
  }

  render() {
    const {children} = this.props;
    const {type, props} = children;
    return React.createElement(
      type || 'div',
      this.cleanProps(props),
      children ? children.props.children : children
    );
  }
}

AnimatorContent.propTypes = {
  children: node
};

export default AnimatorContent;
