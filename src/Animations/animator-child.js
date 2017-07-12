import React, {Component} from 'react';
import ClassManager from './services/class-manager';
import {node, object, oneOfType, bool, number} from 'prop-types';
// import DomManager from './services/dom-manager';

class AnimatorChild extends Component {

  constructor(props) {
    super(props);
    this.classManager = new ClassManager();
    this.state = {
      height: 'inherit',
      width: 'inherit'
    };
  }

  componentDidMount() {
    // const dom = new DomManager(this.refs.child, this.props);
    //Requires Timeout - when goint to the DOM without timeout the animation does not work on enter
    // setTimeout(() => {
    //   this.setState(dom.getStyle());
    //   if (dom.isRequired()) {
    //     setTimeout(() => {
    //       this.setState(dom.getDefaultStyle());
    //     }, this.props.duration);
    //   }
    // }, 0);
  }

  componentWillReceiveProps() {
    // const dom = new DomManager(this.refs.child, this.props);
    // this.setState(dom.getStyle());
  }

  createWrapper(node) {
    const {height, width} = this.state;
    return <div className={this.classNames.layer1} style={{height, width}}>{node}</div>;
  }

  render() {
    const {children, translate} = this.props;
    this.classNames = this.classManager.getChild(this.props);
    return this.createWrapper(
      <div className={this.classNames.layer2}>
        {translate ? <div className={this.classNames.layer3} ref="child">{children}</div> : <div ref="child">{children}</div>}
      </div>
    );
  }
}

AnimatorChild.propTypes = {
  children: node,
  height: bool,
  width: bool,
  duration: number,
  translate: oneOfType([object, bool]),
};

export default AnimatorChild;
