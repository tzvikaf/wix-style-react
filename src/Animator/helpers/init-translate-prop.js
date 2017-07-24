const defaultSize = {in: '100%', out: '100%'};
const defaultPosition = {in: 'top', out: 'top'};

const getTo = to => {
  if (typeof to === 'object') {
    to = {in: to.in ? to.in : defaultPosition.in, out: to.out ? to.out : defaultPosition.out};
  } else {
    to = {in: to, out: to};
  }
  return to;
};

const getSize = (sizeObject, inOrOut) => {
  const size = sizeObject[inOrOut];
  return size ? size : defaultSize[inOrOut];
};

const getSizeInOut = (_in, out) => ({in: _in, out});
const getSizeInOutMono = size => getSizeInOut(size, size);

const getSizeObject = size => {
  if (typeof size === 'object') {
    size = getSizeInOut(getSize(size, 'in'), getSize(size, 'out'));
  } else if (!!size || size === 0) {
    size = getSizeInOutMono(size);
  } else {
    size = defaultSize;
  }
  size.in = typeof size.in === 'number' ? `${size.in}%` : size.in;
  size.out = typeof size.out === 'number' ? `${size.out}%` : size.out;

  return size;
};

const initTranslateProp = translate => {
  if (typeof translate === 'boolean') {
    translate = {to: {in: 'top', out: 'top'}, size: defaultSize};
  } else if (typeof translate === 'string') {
    translate = {to: {in: translate, out: translate}, size: defaultSize};
  } else {
    const {to, size} = translate;
    translate = {to: getTo(to), size: getSizeObject(size)};
  }

  return translate;
};

export default initTranslateProp;
