// import React from 'react';
// import ModalSelector from './ModalSelector';
// import ModalSelectorFactory from './ModalSelector.driver';
// import {createDriverFactory} from '../test-common';
// import sinon from 'sinon';
// import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';
// import {modalSelectorTestkitFactory} from '../../testkit';
// import {modalSelectorTestkitFactory as enzymeModalSelectorTestkitFactory} from '../../testkit/enzyme';

// describe('ModalSelector', () => {
//   const createDriver = createDriverFactory(ModalSelectorFactory);

//   let props = {};

//   beforeEach(() => {
//     document.body.innerHTML = ''; //remove previous modals from body
//     props = {};
//     props.isOpen = true;
//     props.contentLabel = 'modal_' + Math.random();
//   });

//   // describe('content', () => {

//   //   it(`should not render the modal content if not open by default`, () => {
//   //     props.isOpen = false;

//   //     const driver = createDriver(<Modal {...props}>
//   //       <div data-hook="inner-div"/>
//   //     </Modal>);
//   //     expect(driver.getChildBySelector('[data-hook="inner-div"]')).toBeNull();
//   //   });

//   //   it(`should render the passed children in the markup`, () => {
//   //     props.isOpen = true;
//   //     const driver = createDriver(<Modal {...props}>
//   //       <div data-hook="inner-div"/>
//   //     </Modal>);
//   //     expect(driver.getChildBySelector('[data-hook="inner-div"]')).not.toBeNull();
//   //   });

//   // });

//   // describe('callbacks', () => {
//   //   it(`should trigger the onAfterOpen function`, () => {
//   //     props.onAfterOpen = sinon.spy();

//   //     createDriver(<Modal {...props}/>);
//   //     expect(props.onAfterOpen.calledOnce).toBeTruthy();
//   //   });

//   //   it(`should trigger the onRequestClose function when clicking the overlay`, () => {

//   //     props.onRequestClose = sinon.spy();
//   //     props.shouldCloseOnOverlayClick = true;
//   //     props.closeTimeoutMS = 0;

//   //     const driver = createDriver(<Modal {...props}/>);
//   //     driver.clickOnOverlay();

//   //     expect(props.onRequestClose.calledOnce).toBeTruthy();
//   //   });

//   //   it(`should wait closeTimeoutMS before removing the modal`, done => {

//   //     props.closeTimeoutMS = 400;
//   //     jasmine.DEFAULT_TIMEOUT_INTERVAL = props.closeTimeoutMS + 500;

//   //     const driver = createDriver(<Modal {...props}/>);
//   //     driver.setProps({
//   //       isOpen: false
//   //     });

//   //     setTimeout(() => {
//   //       expect(driver.isOpen()).toBeTruthy();
//   //     }, props.closeTimeoutMS - 50);

//   //     setTimeout(() => {
//   //       expect(driver.isOpen()).toBeFalsy();
//   //       done();
//   //     }, props.closeTimeoutMS + 50);

//   //   });
//   // });

//   // describe('theme', () => {
//   //   it('should set the theme by default to "blue"', () => {
//   //     const driver = createDriver(<Modal {...props}/>);
//   //     expect(driver.isThemeExist('blue')).toBeTruthy();
//   //   });

//   //   it('should allowing setting the theme', () => {
//   //     props.theme = 'green';
//   //     const driver = createDriver(<Modal {...props}/>);
//   //     expect(driver.isThemeExist('green')).toBeTruthy();
//   //     expect(driver.isThemeExist('blue')).toBeFalsy();
//   //   });
//   // });

//   // describe('scrollable', () => {
//   //   it('should be set to true by default', () => {
//   //     const driver = createDriver(<Modal {...props}/>);
//   //     expect(driver.isScrollable()).toBe(true);
//   //   });
//   //   it('should allow disabling the scrolling', () => {
//   //     const driver = createDriver(<Modal {...props} scrollable={false}/>);
//   //     expect(driver.isScrollable()).toBe(false);
//   //   });
//   // });

//   describe('testkit', () => {
//     it('should exist', () => {
//       expect(isTestkitExists(<ModalSelector {...props}/>, modalSelectorTestkitFactory)).toBe(true);
//     });
//   });

//   describe('enzyme testkit', () => {
//     it('should exist', () => {
//       expect(isEnzymeTestkitExists(<ModalSelector {...props}/>, enzymeModalSelectorTestkitFactory)).toBe(true);
//     });
//   });


// });
