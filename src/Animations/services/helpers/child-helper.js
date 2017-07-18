import Item from './item-helper';
import ClassBuilder from '../builders/class-builder';
import StyleBuilder from '../builders/style-builder';
import shouldFlipAnimation from './should-flip-animation';

class ChildHelper {

  propsHelper;
  itemsLength;
  time;
  props;
  index;
  item;
  sequenceName;

  constructor({propsHelper, itemsLength, index, time, item}) {
    this.props = item.props || {};
    this.propsHelper = propsHelper;
    this.itemsLength = itemsLength;
    this.time = time;
    this.item = new Item(item);
    this.index = index;
    this.sequenceName = this.propsHelper.getSequenceName();
  }

  getClassLayer1() {
    return new ClassBuilder(this.propsHelper.getAll())
      .withChildLayer(1)
      .withTranslateWrapper()
      .withDebug()
      .withClassName(this.props.childClassName)
      .withSequence()
      .build();
  }

  getClassLayer2() {
    return new ClassBuilder(this.propsHelper.getAll())
      .withChildLayer(2)
      .withOpacity()
      .withScale()
      .withHeight()
      .withTiming()
      .build();
  }

  getClassLayer3() {
    return new ClassBuilder(this.propsHelper.getAll())
      .withChildLayer(3)
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

  getStyle(phase) {

    const style1 = new StyleBuilder(this.propsHelper).with(this.props.childStyle || {});
    const style2 = new StyleBuilder(this.propsHelper);
    const style3 = new StyleBuilder(this.propsHelper);

    if (this.sequenceName) {
      const shouldFlip = shouldFlipAnimation(this.sequenceName, phase);
      const index = shouldFlip ? this.itemsLength - this.index : this.index;
      const duration = this.time.getDurationInPosition(index);
      const delay = this.time.getDelayInPosition(index);

      style1
        .withTransitionDelay(delay)
        .withAnimationDelay(duration);
      style2
        .withTransitionDelay(delay);
      style3
        .withTransitionDelay(delay);
    }

    return {
      style1: style1.build(),
      style2: style2.build(),
      style3: style3.build()
    };
  }

  getContentProps() {
    return this.item.getContentProps();
  }

}

export default ChildHelper;
