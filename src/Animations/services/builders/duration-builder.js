import {propsDefault, timingMap} from '../constants/constants';

const getSequenceDuration = numberOfChildren => {
  return (numberOfChildren - 1) * propsDefault.sequenceDelay;
};

const getDurationFromTiming = timing => {
  return timingMap[timing];
};

const getAnimationDuration = (timing, isTranslate) => {
  return isTranslate ? propsDefault.duration : getDurationFromTiming(timing);
};


class DurationBuilder {

  data;

  constructor(data) {
    this.data = data;
  }

  get() {
    const {isAnimate, isSequence, numberOfChildren, timing, translate} = this.data;
    const animationDuration = isAnimate ? getAnimationDuration(timing, translate) : 0;
    const sequenceDuration = isSequence ? getSequenceDuration(numberOfChildren) : 0;
    return animationDuration + sequenceDuration;
  }

  getChildDelay(index) {
    const {timing, translate} = this.data;
    return getAnimationDuration(timing, translate) + (80 * (index - 1));
  }
}

export default DurationBuilder;
