const css = {
  convertTime: time => time ? `${time / 1000}s` : ''
};

class StyleBuilder {

  styles;

  constructor() {
    this.styles = {};
  }

  with(styles) {
    this.styles = Object.assign({}, this.styles, styles);
    return this;
  }

  withTransitionDelay(duration) {
    return this.with(duration && {
      transitionDelay: css.convertTime(duration)
    });
  }

  withAnimationDelay(duration) {
    return this.with(duration && {
      animationDuration: css.convertTime(duration)
    });
  }

  build() {
    return this.styles;
  }
}

export default StyleBuilder;
