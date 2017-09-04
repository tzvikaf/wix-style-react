import React from 'react';
import ModalSelector from './ModalSelector';
import ModalSelectorFactory from './ModalSelector.driver';
import {createDriverFactory} from '../test-common';
import sinon from 'sinon';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';
import {modalSelectorTestkitFactory} from '../../testkit';
import {modalSelectorTestkitFactory as enzymeModalSelectorTestkitFactory} from '../../testkit/enzyme';

describe('ModalSelector', () => {
  const createDriver = createDriverFactory(ModalSelectorFactory);

  let props = {};

  beforeEach(() => {
    document.body.innerHTML = ''; //remove previous modals from body
    props = {};
    props.isOpen = true;
    props.contentLabel = 'modal_' + Math.random();
  });

  describe('content', () => {

    it(`should not render the modal content if not open by default`, () => {
      props.isOpen = false;

      const driver = createDriver(<ModalSelector {...props}>
        <div data-hook="inner-div"/>
      </ModalSelector>);
      expect(driver.getChildBySelector('[data-hook="inner-div"]')).toBeNull();
    });

    it(`should render the passed children in the markup`, () => {
      props.isOpen = true;
      const driver = createDriver(<ModalSelector {...props}>
        <div data-hook="inner-div"/>
      </ModalSelector>);
      expect(driver.getChildBySelector('[data-hook="inner-div"]')).not.toBeNull();
    });

  });

  describe('callbacks', () => {
    it(`should trigger the onClose function when clicking the close button`, () => {

      props.onClose = sinon.spy();

      const driver = createDriver(<ModalSelector {...props}/>);
      driver.clickOnClose();

      expect(props.onClose.calledOnce).toBeTruthy();
    });

    it(`should trigger the onOk function when clicking the ok button`, () => {

      props.onOk = sinon.spy();

      const driver = createDriver(<ModalSelector {...props}/>);
      driver.clickOnOk();

      expect(props.onOk.calledOnce).toBeTruthy();
    });

    it(`should trigger the onCancel function when clicking the cancel button`, () => {

      props.onCancel = sinon.spy();

      const driver = createDriver(<ModalSelector {...props}/>);
      driver.clickOnCancel();

      expect(props.onCancel.calledOnce).toBeTruthy();
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<ModalSelector {...props}/>, modalSelectorTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<ModalSelector {...props}/>, enzymeModalSelectorTestkitFactory)).toBe(true);
    });
  });


});
