import React, {Component} from 'react';
import CssClass from './services/css-class';
import {node, object, oneOfType, bool} from 'prop-types';
import DomManager from './services/dom-manager';

class AnimatorChild extends Component {

  constructor(props) {
    super(props);
    this.cssClass = new CssClass();
    this.dom = new DomManager();
    this.state = {
      height: 0
    };
  }

  componentDidMount() {
    const {height} = this.props;
    this.setState({height: this.dom.getHeight(this.refs.child, height)});
  }

  createWrapper(node) {
    const {height} = this.state;
    return <div className={this.cssClass.getChildSequence(this.props)} style={{height}}>{node}</div>;
  }

  render() {
    const {children, translate} = this.props;
    return this.createWrapper(
      <div className={this.cssClass.getChild(this.props)} ref="child">
        {translate ? <div className={this.cssClass.getChildTranslate(this.props)}>{children}</div> : children}
      </div>
    );
  }
}

AnimatorChild.propTypes = {
  children: node,
  height: bool,
  translate: oneOfType([object, bool]),
};

export default AnimatorChild;
