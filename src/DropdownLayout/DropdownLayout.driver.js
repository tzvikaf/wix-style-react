import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import styles from './DropdownLayout.scss';

const dropdownLayoutDriverFactory = ({element, wrapper, component}) => {

  const isClassExists = (element, className) => !!(element.className.match(new RegExp('\\b' + className + '\\b')));
  const contentContainer = element.childNodes[0];
  const options = element.querySelector('[data-hook=dropdown-layout-options]');
  const optionAt = position => (options.childNodes[position]);

  return {
    exists: () => !!element,
    isShown: () => isClassExists(contentContainer, 'shown'),
    isDown: () => isClassExists(contentContainer, 'down'),
    isUp: () => isClassExists(contentContainer, 'up'),
    hasTheme: theme => isClassExists(element, `theme-${theme}`),
    tabIndex: () => element.tabIndex,
    optionsLength: () => options.childNodes.length,
    mouseEnterAtOption: position => ReactTestUtils.Simulate.mouseEnter(optionAt(position)),
    mouseLeaveAtOption: position => ReactTestUtils.Simulate.mouseLeave(optionAt(position)),
    mouseClickOutside: () => ReactTestUtils.Simulate.blur(contentContainer),
    isOptionExists: optionText => [].filter.call(options.childNodes, opt => opt.textContent === optionText).length > 0,
    isOptionHovered: position => isClassExists(optionAt(position), 'hovered'),
    isOptionSelected: position => isClassExists(optionAt(position), 'selected'),
    isOptionHoveredWithGlobalClassName: position => isClassExists(optionAt(position), 'wixstylereactHovered'),
    isOptionSelectedWithGlobalClassName: position => isClassExists(optionAt(position), 'wixstylereactSelected'),
    classes: () => options.className,
    pressDownKey: () => ReactTestUtils.Simulate.keyDown(element, {key: 'ArrowDown'}),
    pressUpKey: () => ReactTestUtils.Simulate.keyDown(element, {key: 'ArrowUp'}),
    pressEnterKey: () => ReactTestUtils.Simulate.keyDown(element, {key: 'Enter'}),
    pressTabKey: () => ReactTestUtils.Simulate.keyDown(element, {key: 'Tab'}),
    pressEscKey: () => ReactTestUtils.Simulate.keyDown(element, {key: 'Escape'}),
    optionContentAt: position => optionAt(position).textContent,
    clickAtOption: position => ReactTestUtils.Simulate.click(optionAt(position)),
    clickAtOptionWithValue: value => {
      const option = Object.values(options.childNodes).find(option => option.innerHTML === value);
      option && ReactTestUtils.Simulate.click(option);
    },
    isOptionADivider: position => isClassExists(optionAt(position), 'divider'),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    },
    hasTopArrow: () => !!element.querySelector(`.${styles.arrow}`)
  };
};

export default dropdownLayoutDriverFactory;
