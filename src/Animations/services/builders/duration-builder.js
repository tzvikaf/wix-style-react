import {propsDefault, timingMap} from '../constants/constants';

const getSequenceDuration = numberOfChildren => {
  return (numberOfChildren - 1) * propsDefault.sequenceDelay;
};

const getAnimationDuration = (timing, isTranslate) => {
  const duration = timingMap[timing];
  return isTranslate ? propsDefault.duration : duration;
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
}

export default DurationBuilder;
