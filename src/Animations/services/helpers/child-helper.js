import PropsHelper from './props-helper';
import Item from './item-helper';
import ClassBuilder from '../builders/class-builder';
import {validChildProps} from '../constants/constants';

class ChildHelper {

  data;
  index;
  reverseIndex;
  childProps;

  constructor({props, index, item, numberOfChildren}) {

    this.childProps = item.props || {};
    const propsHelper = new PropsHelper(props);
    this.data = propsHelper.getProps(validChildProps);
    this.item = new Item(item, index, numberOfChildren);
    this.index = this.item.getPosition();
    this.reverseIndex = this.item.getReversePosition();
  }

  getLayer1() {
    const {index, reverseIndex} = this;
    return new ClassBuilder(this.data)
      .withTranslateWrapper()
      .withClassName(this.childProps.childClassName)
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

  getStyle() {
    return this.childProps.childStyle || {};
  }
  getContentProps() {
    return this.item.getContentProps();
  }

}

export default ChildHelper;
