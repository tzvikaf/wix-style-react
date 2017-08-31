import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import styles from './Input.scss';

const inputDriverFactory = ({element, wrapper, component}) => {
  const input = element && element.querySelector('input');
  const clearButton = element && element.querySelector(`.${styles.clearButton}`);

  return {
    trigger: (trigger, event) => ReactTestUtils.Simulate[trigger](input, event),
    focus: () => input.focus(),
    blur: () => ReactTestUtils.Simulate.blur(input),
    keyDown: key => ReactTestUtils.Simulate.keyDown(input, {key}),
    clickClear: () => ReactTestUtils.Simulate.click(clearButton),
    enterText: text => ReactTestUtils.Simulate.change(input, {target: {value: text}}),
    getValue: () => input.value,
    getPlaceholder: () => input.placeholder,
    getDefaultValue: () => input.defaultValue,
    getTabIndex: () => input.tabIndex,
    getReadOnly: () => input.readOnly,
    getTextOverflow: () => input.style['text-overflow'],
    getAriaLabel: () => input.getAttribute('aria-label'),
    getAriaControls: () => input.getAttribute('aria-controls'),
    getAriaDescribedby: () => input.getAttribute('aria-describedby'),
    getAutocomplete: () => input.getAttribute('autocomplete'),
    getType: () => input.type,
    hasPrefix: () => element.querySelectorAll(`.${styles.prefix}`).length === 1,
    hasPrefixClass: () => element.querySelectorAll(`.${styles.input}.${styles.withPrefix}`).length === 1,
    hasSuffix: () => element.querySelectorAll(`.${styles.suffix}`).length === 1,
    hasSuffixClass: () => element.querySelectorAll(`.${styles.input}.${styles.withSuffix}`).length === 1,
    hasSuffixesClass: () => element.querySelectorAll(`.${styles.input}.${styles.withSuffixes}`).length === 1,
    prefixComponentExists: style => !!element.querySelector(`.${styles.prefix} ${style}`),
    suffixComponentExists: style => !!element.querySelector(`.${styles.suffix} ${style}`),
    hasExclamation: () => !!element.querySelector(`.${styles.exclamation}`),
    hasHelp: () => !!element.querySelector(`.${styles.help}`),
    hasError: () => element.classList.contains(styles.hasError),
    getTooltipElement: () => element,
    getTooltipDataHook: () => 'input-tooltip',
    getDataHook: () => element.getAttribute('data-hook'),
    getUnit: () => element.querySelector(`.${styles.unit}`).textContent,
    hasMagnifyingGlass: () => !!element.querySelector(`.${styles.magnifyingGlass}`),
    hasMenuArrow: () => !!element.querySelector(`.${styles.menuArrow}`),
    hasClearButton: () => !!clearButton,
    isRTL: () => element.className.indexOf(styles.rtl) >= 0,
    isFocusedStyle: () => element.classList.contains(styles.hasFocus),
    isHoveredStyle: () => element.classList.contains(styles.hasHover),
    isDisabled: () => element.classList.contains(styles.disabled),
    isOfStyle: style => element.classList.contains(styles[`theme-${style}`]),
    isOfSize: size => element.classList.contains(styles[`size-${size}`]),
    isFocus: () => document.activeElement === input,
    exists: () => !!(element && element.querySelector('input')),
    hasIconLeft: () => !!element.querySelectorAll(`.${styles.prefix}`),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default inputDriverFactory;
