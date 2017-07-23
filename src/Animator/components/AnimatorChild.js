import React, {Component} from 'react';
import {node, object, any, number} from 'prop-types';
import AnimatorContent from './AnimatorContent';
import AnimatorChildStyle from '../helpers/animator-child-styles';
import AnimatorChildClasses from '../helpers/animator-child-classes';
import ReactDOM from 'react-dom';
import getDimensions from '../helpers/get-dimensions';

class AnimatorChild extends Component {

  styles;
  node;
  dimensions;

  constructor(props) {
    super(props);
    this.dimensions = {
      height: 0,
      width: 0
    };
  }

  componentDidMount() {
    if (this.isDimensionAnimation()) {
      const layer3 = ReactDOM.findDOMNode(this.refs.layer3);
      this.node = layer3.children[0] ? layer3.children[0] : layer3;
      // this.setDimensions(); //required in case appear:false
    }
  }

  isDimensionAnimation() {
    const {height, width} = this.props.animatorProps;
    return height || width;
  }

  componentWillReceiveProps({transition: {entering, exiting}}) {
    if (this.isDimensionAnimation() && (entering || exiting)) {
      this.setDimensions();
    }
  }

  setDimensions() {
    const {height, width} = this.props.animatorProps;
    this.dimensions = getDimensions(this.node, {height, width});
  }

  render() {
    const {children} = this.props;

    const [style1, style2, style3] = new AnimatorChildStyle(this.props, this.dimensions).get();
    const [class1, class2, class3] = new AnimatorChildClasses(this.props).get();

    return (
      <div className={class1} style={style1}>
        <div className={class2} style={style2}>
          <div className={class3} style={style3} ref="layer3" data-hook="child-layer-3">
            <AnimatorContent>{children}</AnimatorContent>
          </div>
        </div>
      </div>
    );
  }
}

AnimatorChild.propTypes = {
  children: node,
  animatorProps: object,
  childClassName: any,
  childStyle: any,
  sequenceIndex: number,
  transition: object
};

export default AnimatorChild;
