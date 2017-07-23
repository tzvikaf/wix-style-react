const css = {
  convertTime: time => time ? `${time / 1000}s` : '',
  convertSize: size => size ? `${size}px` : '0'
};

const translateTemplates = {
  top: size => `translate(0, ${size})`,
  bottom: size => `translate(0, -${size})`,
  left: size => `translate(${size}, 0)`,
  right: size => `translate(-${size}, 0)`
};

const getTranslate = (translate, inOrOut) => translateTemplates[translate.to[inOrOut]](translate.size[inOrOut]);

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

  withTranslate(translate, inOrOut) {
    return this.with(translate && {
      transform: getTranslate(translate, inOrOut)
    });
  }

  withScale(scale) {
    return this.with(scale && {
      transform: `scale(${scale})`
    });
  }

  withHeight(height, size) {
    return this.with(height && {
      maxHeight: css.convertSize(size)
    });
  }

  withWidth(width, size) {
    return this.with(width && {
      maxWidth: css.convertSize(size)
    });
  }

  build() {
    return this.styles;
  }
}

export default StyleBuilder;
