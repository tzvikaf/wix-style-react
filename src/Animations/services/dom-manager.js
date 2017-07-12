import ReactDOM from 'react-dom';

class DomManager {

  ref;
  props;
  requiredDimensionsProps;
  defaultStyle;

  constructor(ref, props) {
    this.ref = ref;
    this.props = props;
    this.requiredDimensionsProps = ['height', 'width'];
    this.defaultStyle = {
      height: 'inherit',
      width: 'inherit'
    };
  }

  isRequired() {
    return !!this.requiredDimensionsProps.filter(p => !!this.props[p]);
  }

  getNode() {
    return ReactDOM.findDOMNode(this.ref);
  }

  getDimensions() {
    const node = ReactDOM.findDOMNode(this.ref).children[0];
    return {
      height: `${node.clientHeight}px`,
      width: `${node.clientWidth}px`
    };
  }

  getDefaultStyle() {
    return this.defaultStyle;
  }

  getStyle() {
    return this.isRequired() ? this.getDimensions() : this.defaultStyle;
  }
}

export default DomManager;
