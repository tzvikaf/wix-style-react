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

  shouldFlip(sequence, phase) {
    let isFlip = true;
    if (phase === 'enter') {
      if ((sequence === 'default') || (sequence === 'flip')) {
        isFlip = false;
      }
    } else if (phase === 'exit') {
      if ((sequence === 'default') || (sequence === 'reverse-flip')) {
        isFlip = false;
      }
    }
    return isFlip;
  }

  getChild(index, sequence, numberOfChildren, phase) {
    const {timing, translate} = this.data;
    const shouldFlip = this.shouldFlip(sequence, phase);
    const newIndex = shouldFlip ? numberOfChildren - index : index - 1;
    return {
      transition: newIndex * 80, // 1: 0 2: 80
      animation: getAnimationDuration(timing, translate) + (80 * newIndex) // 1: 300 + 0 2: 300 +80
    };
  }
}

export default DurationBuilder;
