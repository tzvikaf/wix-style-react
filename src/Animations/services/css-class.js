import css from './../Animator.scss';

class CssClass {

  constructor() {
    this.childCssProps = ['opacity', 'scale', 'timing'];
    this.parentCssProps = ['sequenceDelay'];
    this.baseCss = Object.entries({child: true});
  }

  filter(list, key) {
    return list.indexOf(key) > -1;
  }

  map(key, value) {
    if (value) {
      return typeof value === 'boolean' ? css[key] : css[value];
    }
  }

  getChild(props) {
    return Object.entries(props)
      .filter(([key]) => this.filter(this.childCssProps, key))
      .concat(this.baseCss)
      .map(([key, value]) => this.map(key, value))
      .join(' ');
  }

  getParent(props) {
    return Object.entries(props)
      .filter(([key]) => this.filter(this.parentCssProps, key))
      .map(([key, value]) => this.map(key, value))
      .join(' ');
  }

}

export default CssClass;
