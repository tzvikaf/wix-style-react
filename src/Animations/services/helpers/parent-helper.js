import PropsHelper from './props-helper';
import Items from './items-helper';
import ClassBuilder from '../builders/class-builder';
import {transitionClassNames} from '../constants/constants';
import Time from '../class/time-class';
import ChildHelper from './child-helper';

class ParentHelper {

  items;
  time;
  propsHelper;

  constructor(props) {
    this.propsHelper = new PropsHelper(props);
    this.items = new Items(this.propsHelper.getChildren());
    this.time = new Time(this.propsHelper, this.items);
  }

  getItemsList() {
    return this.items.getList();
  }

  getDuration() {
    return this.time.getTotalDuration();
  }

  getClass() {
    const {sequence, className} = this.propsHelper.getProps(['sequence', 'className']);
    return new ClassBuilder({sequence})
      .withAppearanceState(this.items.isExist())
      .withSequenceWrapper()
      .withClassName(className)
      .build();
  }

  getTransitionGroupProps() {

    const duration = this.getDuration();

    return {
      enter: !!duration,
      exit: !!duration,
      timeout: duration,
      classNames: transitionClassNames
    };
  }

  getChildHelper(index, item) {
    const {propsHelper, time} = this;
    return new ChildHelper({propsHelper, item, time, index, itemsLength: this.items.getLength()});
  }

}

export default ParentHelper;
