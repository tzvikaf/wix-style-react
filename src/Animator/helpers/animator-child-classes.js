import ClassBuilder from '../builders/class-builder';

class AnimatorChildClasses {

  props;
  classes;

  constructor(props) {
    this.props = props;

    this.classes = [
      this.getFirstLayer(),
      this.getSecondLayer(),
      this.getThirdLayer(),
    ];
  }

  getFirstLayer() {

    const {debug, sequence} = this.props.animatorProps;
    const {childClassName} = this.props;

    return new ClassBuilder()
      .withChildLayer(1)
      .withDebug(debug)
      .withClassName(childClassName)
      .withSequence(sequence)
      .build();
  }

  getSecondLayer() {

    const {translate, opacity, scale, timing} = this.props.animatorProps;

    return new ClassBuilder()
      .withChildLayer(2)
      .withOpacity(opacity)
      .withScale(scale)
      .withTranslateWrapper(translate)
      .withTiming(timing)
      .build();
  }

  getThirdLayer() {

    const {translate, height, width} = this.props.animatorProps;

    return new ClassBuilder()
      .withChildLayer(3)
      .withTranslate(translate)
      .withHeight(height)
      .withWidth(width)
      .build();
  }

  get() {
    return this.classes;
  }
}

export default AnimatorChildClasses;
