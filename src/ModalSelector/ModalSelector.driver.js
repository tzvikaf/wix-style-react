// import React from 'react';
// import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

const modalSelectorDriverFactory = (/*{element, wrapper, component}*/) => {

  const getPortal = () => document.body.querySelector('.portal');
  const getCloseButton = () => document.body.querySelector('[data-hook="header-close-button"]');
  const getCancelButton = () => document.body.querySelector('[data-hook="cancellation-button"]');
  const getOkButton = () => document.body.querySelector('[data-hook="confirmation-button"]');
  const getContent = () => document.body.querySelector('.ReactModal__Content');

  return {
    exists: () => !!(getPortal()),
    // element: () => element,
    isOpen: () => !!(getContent()),
    // isThemeExist: theme => !!getPortal().querySelector(`.${theme}`),
    getChildBySelector: selector => getPortal().querySelector(selector),
    // isScrollable: () => !getPortal().classList.contains('portalNonScrollable'),
    clickOnClose: () => {
      ReactTestUtils.Simulate.click(getCloseButton());
    },
    clickOnOk: () => {
      ReactTestUtils.Simulate.click(getOkButton());
    },
    clickOnCancel: () => {
      ReactTestUtils.Simulate.click(getCancelButton());
    },
    // setProps: props => {
    //   const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
    //   ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    // }
  };
};

export default modalSelectorDriverFactory;
