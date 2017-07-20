import React, {Component} from 'react';
import {node, object, any, number} from 'prop-types';
import AnimatorContent from './AnimatorContent';
import ClassBuilder from '../builders/class-builder';
import AnimatorChildStyle from '../helpers/animation-child-styles';

class AnimatorChild extends Component {

  styles;

  getClasses() {
    const {translate, debug, sequence, opacity, scale, height, timing, width} = this.props.animatorProps;
    return {
      class1: new ClassBuilder()
        .withChildLayer(1)
        .withDebug(debug)
        .withClassName(this.props.childClassName)
        .withSequence(sequence)
        .build(),
      class2: new ClassBuilder()
        .withChildLayer(2)
        .withOpacity(opacity)
        .withScale(scale)
        .withHeight(height)
        .withWidth(width)
        .withTranslateWrapper(translate)
        .withTiming(timing)
        .build(),
      class3: new ClassBuilder()
        .withChildLayer(3)
        .withTranslate(translate)
        .build()
    };
  }

  render() {
    const {children} = this.props;
    const {class1, class2, class3} = this.getClasses();
    const [style1, style2, style3] = new AnimatorChildStyle(this.props).get();

    return (
      <div className={class1} style={style1}>
        <div className={class2} style={style2}>
          <div className={class3} style={style3} >
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
