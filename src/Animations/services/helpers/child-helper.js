import PropsHelper from './props-helper';
import Item from './item-helper';
import ClassBuilder from '../builders/class-builder';

class ChildHelper {

  data;
  index;
  reverseIndex;

  constructor(props, index, numberOfChildren) {
    const propsHelper = new PropsHelper(props);
    this.data = propsHelper.getProps(['translate', 'sequence', 'opacity', 'scale', 'timing']);
    this.item = new Item(index, numberOfChildren);
    this.index = this.item.getPosition();
    this.reverseIndex = this.item.getReversePosition();
  }

  getLayer1() {
    const {translate, sequence} = this.data;
    const {index, reverseIndex} = this;

    return new ClassBuilder({translate, sequence})
      .withTranslateWrapper()
      .withSequence(index, reverseIndex)
      .build();
  }

  getLayer2() {

    const {opacity, scale, timing} = this.data;
    return new ClassBuilder({opacity, scale, timing})
      .withChild()
      .withOpacity()
      .withScale()
      .withTiming()
      .build();
  }

  getLayer3() {
    const {translate} = this.data;

    return new ClassBuilder({translate})
      .withTranslate()
      .build();
  }

  getClass() {
    return {
      layer1: this.getLayer1(),
      layer2: this.getLayer2(),
      layer3: this.getLayer3()
    };
  }

}

export default ChildHelper;
