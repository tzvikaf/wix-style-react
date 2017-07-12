import css from './../Animator.scss';
import toPairs from 'lodash.topairs';

/*
 *
 * React Element Structure
 * <Animate>
 *   <ChildAnimate>
 *     {children}
 *   </ChildAnimate>
 * </Animate>
 *
 * */

/*
 * HTML Structure
 *                     Animation Classes
 *                     -----------------
 * <div class="        ...    Parent classes   ...  ">  <--- Animator
 *   <div class="      ...Child layer 1 classes...  ">  <--- ChildAnimate: layer 1
 *     <div class="    ...Child layer 2 classes...  ">  <--- ChildAnimate: layer 2
 *       <div class="  ...Child layer 2 classes...  ">  <--- ChildAnimate: layer 3
 *         {children}                                   <--- Content from the outside world
 *       </div>
 *     </div>
 *   </div>
 * </div>
 *
 * */

class CssClass {

  constructor() {

    this.parent = [''];
    this.layer1 = ['sequence'];
    this.layer2 = ['opacity', 'scale', 'height', 'width', 'timing'];
    this.layer3 = ['translate'];

    this.propByNameMap = ['opacity', 'scale', 'height', 'width']
      .reduce((map, propName) => ({[propName]: true, ...map}), {});

    this.propByFunctionMap = {
      timing: value => `timing-${value}`,
      sequence: (value, props) => {
        const {index, reverseIndex} = this.getIndex(props);
        return [
          'sequence',
          `child-sequence-${index}`,
          `child-sequence-reverse-${reverseIndex}`
        ];
      },
      translate: ({to = 'TOP', size = 100}) => {
        size = typeof size === 'number' ? {in: size, out: size} : size;
        const list = ['translate', `translate-${to.toLowerCase()}`, `translate-${size.in}`];
        if (size.in !== size.out) {
          list.push(`translate-out-${size.out}`);
        }
        return list;
      }
    };

    this.propToClassMap = {
      ...this.propByNameMap,
      ...this.propByFunctionMap
    };

  }

  flattenArray(arr) {
    return [].concat.apply([], arr);
  }

  getCssList(props, cssProps) {
    return toPairs(props)
      .filter(([key, value]) => value && cssProps.indexOf(key) > -1);
  }

  getIndex(props) {
    const {index, childrenLength} = props;
    return {
      index: index + 1,
      reverseIndex: childrenLength - index
    };
  }

  getClassFromProp([propName, propValue], props) {
    const classGetter = this.propToClassMap[propName];
    return typeof classGetter === 'function' ? classGetter(propValue, props) : propName;
  }

  getClassString(list) {
    return this
      .flattenArray(list)
      .map(item => css[item])
      .join(' ');
  }

  getClassForLayer(props, layer, baseClassNames = []) {
    const list = this
      .getCssList(props, layer)
      .map(propDetails => this.getClassFromProp(propDetails, props))
      .concat(baseClassNames);

    return this.getClassString(list);
  }

  getChild(props /* Child props */) {
    return {
      layer1: this.getClassForLayer(props, this.layer1, props.translate ? ['translate-wrapper'] : []),
      layer2: this.getClassForLayer(props, this.layer2, ['child']),
      layer3: this.getClassForLayer(props, this.layer3)
    };
  }

  getParent(props /* Parent props */) {

    const {sequence} = props;

    const classNames = [props.children[0] ? 'animate-in' : 'animate-out'];

    if (sequence) {
      classNames.push(typeof sequence === 'string' ? `sequence-${sequence}` : 'sequence-default');
    }

    return this.getClassString(classNames);
  }

}

export default CssClass;
