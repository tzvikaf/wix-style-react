import css from '../../Animator.scss';
import getTranslate from '../props/prop-translate';

const flattenArray = arr => [].concat.apply([], arr);

const convertToArray = value => Array.isArray(value) ? value : [value];

const debugMap = {
  enter: 'enter',
  entering: ['enter', 'enter-active'],
  leave: 'leave',
  leaving: ['leave', 'leave-active']
};

const classMap = {
  child1: () => 'child-layer-1',
  child2: () => 'child-layer-2',
  child3: () => 'child-layer-3',
  opacity: opacity => opacity && 'opacity',
  scale: scale => scale && 'scale',
  height: height => height && 'height',
  timing: timing => timing && `timing-${timing}`,
  translateWrapper: translate => translate && `translate-wrapper`,
  sequence: sequence => sequence && 'child-sequence',
  sequenceWrapper: sequence => sequence && `sequence-${sequence}`,
  translate: translate => translate && getTranslate(translate),
  className: className => className && className,
  debug: mode => mode && debugMap[mode]

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
  getValue(name, value) {
    return this.withName(classMap[name](value));
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

  withChildLayer(number) {
    return this.getValue(`child${number}`, number);
  }

  withDebug(debug) {
    return this.getValue('debug', debug);
  }

  withOpacity(opacity) {
    return this.getValue('opacity', opacity);
  }

  withScale(scale) {
    return this.getValue('scale', scale);
  }

  withHeight(height) {
    return this.getValue('height', height);
  }

  withTiming(timing) {
    return this.getValue('timing', timing);
  }

  withTranslateWrapper(translate) {
    return this.getValue('translateWrapper', translate);
  }

  withSequence(sequence) {
    return this.getValue('sequence', sequence);
  }

  withSequenceWrapper(sequence) {
    return this.getValue('sequenceWrapper', sequence);
  }

  withTranslate(translate) {
    return this.getValue('translate', translate);
  }

  build() {
    return flattenArray(this.names)
      .map(name => css[name])
      .concat(this.classNames)
      .join(' ');
  }

}

export default ClassBuilder;
