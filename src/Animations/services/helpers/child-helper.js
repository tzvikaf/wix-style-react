import PropsHelper from './props-helper';
import Item from './item-helper';
import ClassBuilder from '../builders/class-builder';
import {childProps} from '../constants/constants';

class ChildHelper {

  data;
  index;
  reverseIndex;

  constructor(props, index, numberOfChildren) {
    const propsHelper = new PropsHelper(props);
    this.data = propsHelper.getProps(childProps);
    this.item = new Item(index, numberOfChildren);
    this.index = this.item.getPosition();
    this.reverseIndex = this.item.getReversePosition();
  }

  getLayer1() {
    const {index, reverseIndex} = this;

    return new ClassBuilder(this.data)
      .withTranslateWrapper()
      .withSequence(index, reverseIndex)
      .build();
  }

  getLayer2() {
    return new ClassBuilder(this.data)
      .withChild()
      .withOpacity()
      .withScale()
      .withHeight()
      .withTiming()
      .build();
  }

  getLayer3() {
    return new ClassBuilder(this.data)
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
