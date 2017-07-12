import React, {Component} from 'react';
import CssClass from './services/css-class';
import {node, object, oneOfType, bool, string} from 'prop-types';
import DomManager from './services/dom-manager';

class AnimatorChild extends Component {

  constructor(props) {
    super(props);
    this.cssClass = new CssClass();
    this.state = {
      height: 'inherit',
      width: 'inherit'
    };
  }

  componentDidMount() {
    const dom = new DomManager(this.refs.child, this.props);
    //Requires Timeout - when goint to the DOM without timeout the animation does not work on enter
    setTimeout(() => {
      this.setState(dom.getStyle());
      if (dom.isRequired()) {
        setTimeout(() => {
          this.setState(dom.getDefaultStyle());
        }, this.props.duration);
      }
    }, 0);
  }

  componentWillReceiveProps() {
    const dom = new DomManager(this.refs.child, this.props);
    this.setState(dom.getStyle());
  }

  createWrapper(node) {
    const {height, width} = this.state;
    return <div className={this.cssClass.getChildSequence(this.props)} style={{height, width}}>{node}</div>;
  }

  render() {
    const {children, translate} = this.props;
    return this.createWrapper(
      <div className={this.cssClass.getChild(this.props)}>
        {translate ? <div className={this.cssClass.getChildTranslate(this.props)} ref="child">{children}</div> : <div ref="child">{children}</div>}
      </div>
    );
  }
}

AnimatorChild.propTypes = {
  children: node,
  height: bool,
  width: bool,
  duration: string,
  translate: oneOfType([object, bool]),
};

export default AnimatorChild;
