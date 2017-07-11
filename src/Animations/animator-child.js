import React, {Component} from 'react';
import CssClass from './services/css-class';
import {node, object, oneOfType, bool} from 'prop-types';

class AnimatorChild extends Component {
  constructor(props) {
    super(props);
    this.cssClass = new CssClass();
  }

  wrapWithSequence(node) {
    return <div className={this.cssClass.getChildSequence(this.props)}>{node}</div>;
  }

  render() {

    const {children, translate} = this.props;

    return this.wrapWithSequence(
      <div className={this.cssClass.getChild(this.props)}>
        {translate ? <div className={this.cssClass.getChildTranslate(this.props)}>{children}</div> : children}
      </div>
    );
  }
}

AnimatorChild.propTypes = {
  children: node,
  translate: oneOfType([object, bool]),
};

export default AnimatorChild;
