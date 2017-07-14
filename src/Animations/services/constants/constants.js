import css from '../../Animator.scss';

const top = 'top';
const bottom = 'bottom';
const left = 'left';
const right = 'right';

const micro = 'micro';
const small = 'small';
const medium = 'medium';
const large = 'large';
const debug = 'debug';

const percentages = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const timings = [micro, small, medium, large, debug];
const directions = [top, bottom, left, right];
const sequences = ['default', 'flip', 'reverse', 'reverse-flip'];

const timingMap = {
  micro: 120,
  small: 150,
  medium: 200,
  large: 300,
  debug: 10000
};

const translateMap = {
  to: {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right'
  },
  size: percentages
};

const propsDefault = {
  duration: timingMap[large],
  timing: large,
  sequence: 'default',
  sequenceDelay: 80,
  translate: {
    to: translateMap.to.top,
    size: percentages[5]
  }
};

const animationProps = ['opacity', 'scale', 'height', 'translate', 'width'];

const transitionName = {
  enter: css.enter,
  enterActive: css.enterActive,
  leave: css.leave,
  leaveActive: css.leaveActive
};

export {
  translateMap,
  propsDefault,
  animationProps,
  timings,
  sequences,
  directions,
  percentages,
  transitionName,
  timingMap
};