import css from '../../Animator.scss';
import getTranslate from '../props/prop-translate';
import getSequence from '../props/prop-sequence';

const flattenArray = arr => [].concat.apply([], arr);

const convertToArray = value => Array.isArray(value) ? value : [value];

const classMap = {
  child: () => 'child',
  opacity: opacity => opacity && 'opacity',
  scale: scale => scale && 'scale',
  timing: timing => timing && `timing-${timing}`,
  translateWrapper: translate => translate && `translate-wrapper`,
  sequence: (sequence, ...args) => sequence && getSequence(sequence, ...args),
  sequenceWrapper: sequence => sequence && `sequence-${sequence}`,
  translate: translate => translate && getTranslate(translate)

};

const removeWrapperString = str => {
  const index = str.search('Wrapper');
  return index > -1 ? str.slice(0, index) : str;
};

class ClassBuilder {

  names;
  data;
  constructor(data) {
    this.names = [];
    this.data = data || {};
  }

  with(nameOrNames) {
    nameOrNames && convertToArray(nameOrNames)
      .forEach(name => this.names.push(name));
    return this;
  }

  getFromMap(name, ...args) {
    const prop = this.data[removeWrapperString(name)];
    return this.with(classMap[name](prop, ...args));
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
      .map(item => css[item])
      .join(' ');
  }

}

export default ClassBuilder;
