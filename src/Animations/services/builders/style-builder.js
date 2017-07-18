const css = {
  convertTime: time => time ? `${time / 1000}s` : ''
};

class StyleBuilder {

  styles;
  hasSequence;

  constructor(propHelper) {
    this.styles = {};
    this.hasSequence = propHelper.hasSequence();
  }

  with(styles) {
    this.styles = Object.assign({}, this.styles, styles);
    return this;
  }

  withTransitionDelay(duration) {
    return this.with(this.hasSequence && {
      transitionDelay: css.convertTime(duration)
    });
  }

  withAnimationDelay(duration) {
    return this.with(this.hasSequence && {
      animationDuration: css.convertTime(duration)
    });
  }

  build() {
    return this.styles;
  }
}

export default StyleBuilder;
