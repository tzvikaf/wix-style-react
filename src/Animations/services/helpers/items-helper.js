class Items {

  children;
  list;

  constructor(children) {
    this.children = children;
    this.list = this.getList();
  }

  getList() {
    const {children} = this;
    return Array.isArray(children) ? children : [children];
  }

  isMoreThanOne() {
    return this.getLength() > 1;
  }

  getLength() {
    return this.list.length;
  }

  isExist() {
    return !!this.list[0];
  }

}

export default Items;
