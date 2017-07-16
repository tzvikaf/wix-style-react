import PropsHelper from './props-helper';
import Item from './item-helper';
import ClassBuilder from '../builders/class-builder';
import {validChildProps} from '../constants/constants';
import DurationBuilder from '../builders/duration-builder';
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

  getClassLayer1() {
    const {index, reverseIndex} = this;
    return new ClassBuilder(this.data)
      .withTranslateWrapper()
      .withDebug()
      .withClassName(this.childProps.childClassName)
      .withSequence(index, reverseIndex)
      .build();
  }

  getClassLayer2() {
    return new ClassBuilder(this.data)
      .withChild()
      .withOpacity()
      .withScale()
      .withHeight()
      .withTiming()
      .build();
  }

  getClassLayer3() {
    return new ClassBuilder(this.data)
      .withTranslate()
      .build();
  }

  getClass() {
    return {
      layer1: this.getClassLayer1(),
      layer2: this.getClassLayer2(),
      layer3: this.getClassLayer3()
    };
  }

  getChildStyle() {
    return this.childProps.childStyle || {};
  }

  getStyle() {

    const delayStyle = {
      style1: {},
      style2: {},
      style3: {}
    };

    if (this.data.sequence) {
      const animationDuration = `${new DurationBuilder(this.data).getChildDelay(this.index) / 1000}s`;
      const transitionDelay = `${(this.index - 1) * 0.08}s`;
      delayStyle.style1 = {
        animationDuration,
        transitionDelay
      };

      delayStyle.style2 = {
        transitionDelay
      };


      delayStyle.style3 = {
        transitionDelay
      };

    }

    return {
      style1: Object.assign({}, delayStyle.style1, this.getChildStyle()),
      style2: delayStyle.style2,
      style3: delayStyle.style3
    };
  }

  getContentProps() {
    return this.item.getContentProps();
  }

}

export default ChildHelper;
