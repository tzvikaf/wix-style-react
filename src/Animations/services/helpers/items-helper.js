class Items {

  children;
  list;

  constructor(children) {
    this.children = children;
    this.list = this.getList();
  }

  getList() {
    const {children} = this;
    const shuki = Array.isArray(children) ? children : [children];
    return shuki.filter(shuki => !!shuki);
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
