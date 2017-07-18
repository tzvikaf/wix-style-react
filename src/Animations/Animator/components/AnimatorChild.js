import React, {Component} from 'react';
import {node, object, any, number} from 'prop-types';
import AnimatorContent from './AnimatorContent';
import ClassBuilder from '../builders/class-builder';
import {ChildTime} from '../class/time-class';
import StyleBuilder from '../builders/style-builder';

class AnimatorChild extends Component {

  getClasses() {
    const {translate, debug, sequence, opacity, scale, height, timing} = this.props.animatorProps;
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
        .withTranslateWrapper(translate)
        .withTiming(timing)
        .build(),
      class3: new ClassBuilder()
        .withChildLayer(3)
        .withTranslate(translate)
        .build()
    };
  }

  getStyles() {
    const {enter} = this.props.transition;
    const {animatorProps, sequenceIndex} = this.props;
    const {translate} = animatorProps;
    const time = new ChildTime(animatorProps, sequenceIndex);
    const delay = time.getDelay();
    const duration = time.getDuration();

    return this.isStyles() ? {
      style1: new StyleBuilder()
        .withTransitionDelay(delay)
        .withAnimationDelay(duration)
        .build(),
      style2: new StyleBuilder()
        .withTransitionDelay(delay)
        .build(),
      style3: new StyleBuilder()
        .withTransitionDelay(delay)
        .withTranslate(translate, enter ? 'in' : 'out')
        .build()
    } : {};
  }

  getChildStyle() {
    const {childStyle} = this.props;
    return new StyleBuilder().with(childStyle).build();
  }

  isStyles() {
    const {enter, entered, exit} = this.props.transition;
    return (enter && !entered) || exit;
  }

  render() {
    const {children} = this.props;
    const {class1, class2, class3} = this.getClasses();
    const {style1 = {}, style2 = {}, style3 = {}} = this.getStyles();
    return (
      <div className={class1} style={Object.assign({}, style1, this.getChildStyle())}>
        <div className={class2} style={style2}>
          <div className={class3} style={style3}>
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
