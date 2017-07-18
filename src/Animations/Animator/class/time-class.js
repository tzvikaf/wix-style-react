import {propsDefault, timingMap, animationProps} from '../constants/constants';

const getDurationFromTiming = timing => {
  return timingMap[timing];
};

class Time {

  isAnimation;
  hasSequence;
  props;

  constructor(props) {
    this.isAnimation = !!animationProps.find(p => !!props[p]);
    this.hasSequence = !!props.sequence;
    this.props = props;
  }

  getSingleDuration() {
    if (!this.isAnimation) {
      return 0;
    }
    const {translate, timing} = this.props;
    return translate ? propsDefault.duration : getDurationFromTiming(timing);
  }

  getDelayInPosition(index) {
    const {children} = this.props;
    if (this.hasSequence && this.isAnimation && (children.length > 1)) {
      return (index - 1) * propsDefault.sequenceDelay;
    } else {
      return 0;
    }
  }

  getTotalDuration() {
    const {children} = this.props;
    return this.getSingleDuration() + this.getDelayInPosition(children.length);
  }

}

class ChildTime extends Time {

  index;

  constructor(props, index) {
    super(props);
    this.index = index;
  }

  getDelay() {
    const {children} = this.props;
    if (this.hasSequence && this.isAnimation && (children.length > 1)) {
      return (this.index - 1) * propsDefault.sequenceDelay;
    } else {
      return 0;
    }
  }
  getDuration() {
    return this.getSingleDuration() + this.getDelayInPosition(this.index);
  }

}

export {Time, ChildTime};
