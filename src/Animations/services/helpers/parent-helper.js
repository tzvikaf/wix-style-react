import PropsHelper from './props-helper';
import Items from './items-helper';
import ClassBuilder from '../builders/class-builder';
import DurationBuilder from '../builders/duration-builder';
class ParentHelper {

  data;
  isSequence;
  items;

  constructor(props) {
    const propsHelper = new PropsHelper(props);
    this.data = propsHelper.getProps(['children', 'sequence', 'timing', 'translate']);
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
    const {sequence} = this.data;

    return new ClassBuilder({sequence})
      .with(this.items.isExist() ? 'animate-in' : 'animate-out')
      .withSequenceWrapper()
      .build();
  }

  getTransitionName() {

  }

}

export default ParentHelper;
