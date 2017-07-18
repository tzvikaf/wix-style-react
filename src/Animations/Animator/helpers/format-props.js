import React from 'react';

import {
  timings,
  sequences,
  directions,
  percentages,
  debugModes,
  propsDefault,
} from '../constants/constants';

const getDataOrDefault = (arr, value, name) => {
  return arr.indexOf(value) > -1 ? value : propsDefault[name];
};

const getSize = (size = {in: 100, out: 100}, mode) => {
  size = typeof size === 'number' ? size : size[mode];
  return getDataOrDefault(percentages, size, 'size');
};

const getTranslate = translate => {
  if (typeof translate === 'string') {
    translate = {to: translate};
  }

  const {size, to} = translate;
  return ({
    size: {
      in: getSize(size, 'in'),
      out: getSize(size, 'out')
    },
    to: getDataOrDefault(directions, to, 'to')
  });
};


const propsMap = {
  timing: (value, name) => getDataOrDefault(timings, value, name),
  sequence: (value, name) => value && getDataOrDefault(sequences, value, name),
  children: children => React.Children.toArray(children),
  opacity: opacity => !!opacity,
  scale: scale => !!scale,
  height: height => !!height,
  translate: translate => translate && getTranslate(translate),
  className: className => className,
  debug: (value, name) => getDataOrDefault(debugModes, value, name)
};

const getPropData = (name, value) => {
  const getPropMethod = propsMap[name];
  return getPropMethod && getPropMethod(value, name);
};

const getData = props => Object.keys(propsMap).reduce((data, propName) => {
  return ({[propName]: getPropData(propName, props[propName]), ...data});
}, {});

const formatProps = props => getData(props);

export default formatProps;
