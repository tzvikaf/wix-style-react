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
    this.layer1 = ['sequenceDelay'];
    this.layer2 = ['opacity', 'scale', 'height', 'width', 'timing'];
    this.layer3 = ['translate'];

    this.propByNameMap = ['opacity', 'scale', 'height', 'width']
      .reduce((map, propName) => ({[propName]: true, ...map}), {});

    this.propByFunctionMap = {
      timing: value => `timing-${value}`,
      sequenceDelay: (value, props) => {
        return ['sequenceDelay', `childSequenceDelay-${this.getSequenceIndex(props)}`];
      },
      translate: ({to = 'TOP', size = 100}) => {
        return ['translate', `translate-${to.toLowerCase()}`, `translate-${size}`];
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

  getSequenceIndex(props) {
    const {index, sequenceDelay, childrenLength} = props;
    return sequenceDelay === 'reverse' ? childrenLength - index - 1 : index;
  }

  getClassFromProp([propName, propValue], props) {
    const classGetter = this.propToClassMap[propName];
    return typeof classGetter === 'function' ? classGetter(propValue, props) : propName;
  }

  getClassForLayer(props, layer, baseClassNames = []) {
    const list = this
      .getCssList(props, layer)
      .map(propDetails => this.getClassFromProp(propDetails, props))
      .concat(baseClassNames);

    return this
      .flattenArray(list)
      .map(item => css[item])
      .join(' ');
  }

  getChild(props) {
    return {
      layer1: this.getClassForLayer(props, this.layer1),
      layer2: this.getClassForLayer(props, this.layer2, ['child']),
      layer3: this.getClassForLayer(props, this.layer3)
    };
  }

  getParent() {
    return '';
  }

}

export default CssClass;
