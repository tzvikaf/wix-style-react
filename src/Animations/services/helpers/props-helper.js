import {
  timings,
  sequences,
  directions,
  percentages,
  propsDefault,
  animationProps
} from '../constants/constants';

const getDataOrDefault = (arr, value, name) => {
  return arr.indexOf(value) > -1 ? value : propsDefault[name];
};

const getSize = (size, mode) => {
  size = typeof size === 'number' ? size : size[mode];
  return getDataOrDefault(percentages, size, 'size');
};

const getTranslate = ({size, to}) => {
  return ({
    size: {
      in: getSize(size, 'in'),
      out: getSize(size, 'out')
    },
    to: getDataOrDefault(directions, to, 'to')
  });
};


const propsMap = {
  timing: (...args) => getDataOrDefault(timings, ...args),
  sequence: (...args) => getDataOrDefault(sequences, ...args),
  children: children => children,
  opacity: () => true,
  scale: () => true,
  translate: value => getTranslate(value)
};

class PropsHelper {

  props;

  constructor(props) {
    this.props = props;
  }

  getProp(name) {
    const value = this.props[name];
    const getData = propsMap[name];
    return !!value && getData && getData(value, name);
  }

  getProps(names) {
    return names.reduce((props, name) => ({[name]: this.getProp(name), ...props}), {});
  }

  hasAnimationProps() {
    return !!animationProps.find(p => !!this.props[p]);
  }
}

export default PropsHelper;
