import PropsHelper from './props-helper';
import Items from './items-helper';
import ClassBuilder from '../builders/class-builder';
import DurationBuilder from '../builders/duration-builder';
import {transitionName} from '../constants/constants';

class ParentHelper {

  data;
  isSequence;
  items;

  constructor(props) {
    const propsHelper = new PropsHelper(props);
    this.data = propsHelper.getProps(['children', 'sequence', 'timing', 'translate', 'className']);
    console.log('className is', this.data.className);
    this.items = new Items(this.data.children);
    this.isAnimate = propsHelper.hasAnimationProps();
    this.isSequence = this.data.sequence && this.isAnimate && this.items.isMoreThanOne();
  }

  getItems() {
    return this.items;
  }

  getDuration() {
    const {timing, translate} = this.data;
    const {isAnimate, isSequence} = this;
    const numberOfChildren = this.items.getLength();

    return new DurationBuilder({
      isAnimate,
      isSequence,
      numberOfChildren,
      timing,
      translate
    }).get();
  }

  getClass() {
    const {sequence, className} = this.data;

    return new ClassBuilder({sequence, className})
      .withAppearanceState(this.items.isExist())
      .withSequenceWrapper()
      .withClassName()
      .build();
  }

  getTransitionGroupProps() {

    const duration = this.getDuration();

    return {
      transitionEnter: !!duration,
      transitionLeave: !!duration,
      transitionEnterTimeout: duration,
      transitionLeaveTimeout: duration,
      transitionName: transitionName
    }
  }

}

export default ParentHelper;
