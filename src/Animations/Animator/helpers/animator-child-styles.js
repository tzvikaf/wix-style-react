import {ChildTime} from '../class/time-class';
import StyleBuilder from '../builders/style-builder';

class AnimationChildStyles {

  styles;
  translate;
  delay;
  duration;
  transition;
  dimensions;
  props;
  animatorProps;

  constructor(props, dimensions) {

    this.props = props;
    this.animatorProps = this.props.animatorProps;

    const {animatorProps, sequenceIndex} = props;

    this.dimensions = {
      height: dimensions.height,
      width: dimensions.width
    };

    const time = new ChildTime(animatorProps, sequenceIndex);
    this.delay = time.getDelay();
    this.duration = time.getDuration();

    this.styles = [
      this.getFirstLayer(),
      this.getSecondLayer(),
      this.getThirdLayer(),
    ];
  }

  getFirstLayer() {

    const getOutState = () => new StyleBuilder().withTransitionDelay(this.delay).withAnimationDelay(this.duration).build();

    return {
      base: this.props.childStyle,
      enter: getOutState,
      entering: () => ({}),
      exit: getOutState,
      exiting: {}
    };
  }


  getSecondLayer() {

    const {height, width} = this.dimensions;
    const {height: isHeight, width: isWidth, scale} = this.animatorProps;

    const startStyles = () => new StyleBuilder()
      .withTransitionDelay(this.delay)
      .build();

    const dimensionsStyles = (_height, _width) => new StyleBuilder()
      .withWidth(isWidth, _width)
      .withHeight(isHeight, _height);

    const hideStyles = () => {
      return dimensionsStyles(0, 0).withScale(scale).build();
    };

    const showStyles = () => {
      return dimensionsStyles(height, width).withScale(scale && 1).build();
    };

    return {
      base: {},
      enter: () => ({...startStyles(), ...hideStyles()}),
      entering: () => showStyles(),
      exit: () => ({...startStyles(), ...showStyles()}),
      exiting: () => hideStyles()
    };
  }

  getThirdLayer() {

    const {translate} = this.animatorProps;

    const getOutState = () => new StyleBuilder().withTransitionDelay(this.delay);

    return {
      base: {},
      enter: () => getOutState().withTranslate(translate, 'in').build(),
      entering: {},
      exit: () => getOutState().build(),
      exiting: () => new StyleBuilder().withTranslate(translate, 'out').build()
    };
  }

  getStyle(name, callback) {
    return this.props.transition[name] && (typeof callback === 'function') && callback();
  }

  mergeStyles({base, enter, entering, exit, exiting}) {

    return {
      ...base,
      ...(this.getStyle('enter', enter)),
      ...(this.getStyle('entering', entering)),
      ...(this.getStyle('exit', exit)),
      ...(this.getStyle('exiting', exiting)),
    };
  }

  get() {
    return this.styles.map(style => this.mergeStyles(style));
  }
}

export default AnimationChildStyles;
