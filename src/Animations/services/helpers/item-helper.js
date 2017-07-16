class Item {

  index;
  numberOfChildren;
  item;

  constructor(item, index, numberOfChildren) {
    this.item = item;
    this.index = index;
    this.numberOfChildren = numberOfChildren;
  }

  getPosition() {
    return this.index + 1;
  }

  getReversePosition() {
    return this.numberOfChildren - this.index;
  }

  createChildContentProps(props) {
    const newProps = Object.assign({}, props);
    delete newProps.childClassName;
    delete newProps.childStyle;
    delete newProps.debug;
    return newProps;
  }

  getContentProps() {
    const {type, props} = this.item;
    const sonOfChild = this.item.props ? this.item.props.children : this.item;
    const newProps = this.createChildContentProps(props);

    return {
      type: type || 'div',
      newProps,
      sonOfChild
    };
  }
}

export default Item;
