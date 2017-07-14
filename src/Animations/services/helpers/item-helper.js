class Item {

  index;
  numberOfChildren;

  constructor(index, numberOfChildren) {
    this.index = index;
    this.numberOfChildren = numberOfChildren;
  }

  getPosition() {
    return this.index + 1;
  }

  getReversePosition() {
    return this.numberOfChildren - this.index;
  }
}

export default Item;
