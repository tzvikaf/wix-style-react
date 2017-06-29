import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import buttonDriverFactory from '../Backoffice/Button/Button.driver.js';
import dropdownLayoutDriverFactory from '../DropdownLayout/DropdownLayout.driver';
import ReactDOM from 'react-dom';

const ButtonWithOptionsDriverFactory = ({element, wrapper, component}) => {

  const buttonWrapper = element.childNodes[0];
  const buttonDriver = buttonDriverFactory({element: buttonWrapper.childNodes[0], wrapper: buttonWrapper});
  const dropdownLayoutDriver = dropdownLayoutDriverFactory({element: element.childNodes[1].childNodes[0], wrapper});

  const driver = {
    exists: () => !!element,
    buttonWrapper: () => buttonWrapper,
    click: () => buttonDriver.click(),
    pressDownKey: () => ReactTestUtils.Simulate.keyDown(buttonWrapper, {key: 'ArrowDown'}),
    pressUpKey: () => ReactTestUtils.Simulate.keyDown(buttonWrapper, {key: 'ArrowUp'}),
    pressAnyKey: () => ReactTestUtils.Simulate.keyDown(buttonWrapper, {key: 'Any'}),
    pressEnterKey: () => ReactTestUtils.Simulate.keyDown(buttonWrapper, {key: 'Enter'}),
    pressTabKey: () => ReactTestUtils.Simulate.keyDown(buttonWrapper, {key: 'Tab'}),
    pressEscKey: () => ReactTestUtils.Simulate.keyDown(buttonWrapper, {key: 'Escape'}),
    outsideClick: () => ReactTestUtils.Simulate.click(buttonWrapper),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
  return {driver, buttonDriver, dropdownLayoutDriver};
};

export default ButtonWithOptionsDriverFactory;
