import css from '../../Animator.scss';
import getTranslate from '../props/prop-translate';
import getSequence from '../props/prop-sequence';

const flattenArray = arr => [].concat.apply([], arr);

const convertToArray = value => Array.isArray(value) ? value : [value];

const debugMap = {
  enter: 'enter',
  entering: ['enter', 'enter-active'],
  leave: 'leave',
  leaving: ['leave', 'leave-active']
};

const classMap = {
  child: () => 'child',
  opacity: opacity => opacity && 'opacity',
  scale: scale => scale && 'scale',
  height: height => height && 'height',
  timing: timing => timing && `timing-${timing}`,
  translateWrapper: translate => translate && `translate-wrapper`,
  sequence: (sequence, ...args) => sequence && getSequence(sequence, ...args),
  sequenceWrapper: sequence => sequence && `sequence-${sequence}`,
  translate: translate => translate && getTranslate(translate),
  className: className => className && className,
  debug: mode => mode && debugMap[mode]

};

const removeWrapperString = str => {
  const index = str.search('Wrapper');
  return index > -1 ? str.slice(0, index) : str;
};

class ClassBuilder {

  names;
  classNames;
  data;
  constructor(data) {
    this.names = [];
    this.classNames = [];
    this.data = data || {};
  }

  withName(nameOrNames) {
    nameOrNames && convertToArray(nameOrNames)
      .forEach(name => this.names.push(name));
    return this;
  }

  getFromMap(name, ...args) {
    const prop = this.data[removeWrapperString(name)];
    return this.withName(classMap[name](prop, ...args));
  }

  withClassName(className) {
    if (className) {
      this.classNames.push(className);
    }
    return this;
  }

  withAppearanceState(appears) {
    this.names.push(appears ? 'animate-in' : 'animate-out');
    return this;
  }

  withDebug() {
    return this.getFromMap('debug');
  }

  withChild() {
    return this.getFromMap('child');
  }

  withOpacity() {
    return this.getFromMap('opacity');
  }

  withScale() {
    return this.getFromMap('scale');
  }

  withHeight() {
    return this.getFromMap('height');
  }

  withTiming() {
    return this.getFromMap('timing');
  }

  withTranslateWrapper() {
    return this.getFromMap('translateWrapper');
  }

  withSequence(index, reverseIndex) {
    return this.getFromMap('sequence', index, reverseIndex);
  }

  withSequenceWrapper() {
    return this.getFromMap('sequenceWrapper');
  }

  withTranslate() {
    return this.getFromMap('translate');
  }

  build() {
    return flattenArray(this.names)
      .map(name => css[name])
      .concat(this.classNames)
      .join(' ');
  }

}

export default ClassBuilder;
