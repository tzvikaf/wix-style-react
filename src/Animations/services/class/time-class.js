import {propsDefault, timingMap} from '../constants/constants';

const getDurationFromTiming = timing => {
  return timingMap[timing];
};

class Time {

  propsHelper;
  items;

  constructor(propsHelper, items) {
    this.propsHelper = propsHelper;
    this.items = items;
  }

  getSingleDuration() {
    if (!this.propsHelper.isAnimation()) {
      return 0;
    }
    const {translate, timing} = this.propsHelper.getProps(['translate', 'timing']);
    return translate ? propsDefault.duration : getDurationFromTiming(timing);
  }

  getDelayInPosition(index) {
    if (this.propsHelper.hasSequence() && this.propsHelper.isAnimation() && this.items.isMoreThanOne()) {
      return (index - 1) * propsDefault.sequenceDelay;
    } else {
      return 0;
    }
  }
  getDurationInPosition(index) {
    return this.getSingleDuration() + this.getDelayInPosition(index);
  }

  getTotalDuration() {
    return this.getDurationInPosition(this.items.getLength());
  }

}

export default Time;
