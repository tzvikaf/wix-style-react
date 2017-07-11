import React, {Component} from 'react';
import CssClass from './services/css-class';
import {node, object} from 'prop-types';

class AnimatorChild extends Component {
  constructor(props) {
    super(props);
    this.cssClass = new CssClass();
  }

  render() {

    const {children, translate} = this.props;

    return (
      <div className={this.cssClass.getChild(this.props)}>
        {translate ? <div className={this.cssClass.getChildTranslate(this.props)}>{children}</div> : children}
      </div>);
  }
}

AnimatorChild.propTypes = {
  children: node,
  translate: object
};

export default AnimatorChild;
