import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import buttonWithOptionsDriverFactory from './ButtonWithOptions.driver';
import ButtonWithOptions from './ButtonWithOptions';
import {createDriverFactory} from '../test-common';
import {buttonWithOptionsTestkitFactory} from '../../testkit';
import {buttonWithOptionsTestkitFactory as enzymeButtonWithOptionsTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

const runButtonWithOptionsTest = driverFactory => {
  describe('ButtonWithOptions', () => {

    const createDriver = createDriverFactory(driverFactory);
    const options = [
      {id: 0, value: 'Option 1'},
      {id: 1, value: 'Option 2'},
      {id: 2, value: 'Option 3', disabled: true},
      {id: 3, value: 'Option 4'},
      {id: 'divider1', value: '-'},
      {id: 'element1', value: <span style={{color: 'brown'}}>Option 4</span>}
    ];

    const optionsArray = options.map(option => {
      const {value, ...props} = option;
      return <ButtonWithOptions.Option key={option.id} {...props}>{value}</ButtonWithOptions.Option>;
    });

    const buttonWithOptions = props => (
      <ButtonWithOptions {...props}>
        <ButtonWithOptions.Button
          height="medium"
          theme="icon-standard"
          />
        {optionsArray}
      </ButtonWithOptions>
    );

    it('should have a Button and a hidden DropdownLayout', () => {
      const {buttonDriver, dropdownLayoutDriver} = createDriver(buttonWithOptions());
      expect(buttonDriver.exists()).toBeTruthy();
      expect(dropdownLayoutDriver.exists()).toBeTruthy();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should show DropdownLayout when Button is clicked', () => {
      const {buttonDriver, dropdownLayoutDriver} = createDriver(buttonWithOptions());
      buttonDriver.click();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should hide DropdownLayout on enter and esc key press', () => {
      const {driver, dropdownLayoutDriver} = createDriver(buttonWithOptions());
      driver.click();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
      driver.pressEnterKey();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
      driver.pressUpKey();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
      driver.pressEscKey();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should hide options on selection by default', () => {
      const {driver, dropdownLayoutDriver} = createDriver(buttonWithOptions());
      driver.click();
      dropdownLayoutDriver.clickAtOption(0);
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should hide options on outside click', () => {
      const {driver, dropdownLayoutDriver} = createDriver(buttonWithOptions());
      driver.outsideClick();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should not hide options on selection', () => {
      const {driver, dropdownLayoutDriver} = createDriver(buttonWithOptions({closeOnSelect: false}));
      driver.click();
      dropdownLayoutDriver.clickAtOption(0);
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should call onSelect when an option is pressed', () => {
      const onSelect = jest.fn();
      const {driver, dropdownLayoutDriver} = createDriver(buttonWithOptions({onSelect}));
      driver.click();
      dropdownLayoutDriver.clickAtOption(0);
      expect(onSelect).toBeCalledWith(options[0]);
    });

    it('should not call onSelect when a selected option is pressed', () => {
      const onSelect = jest.fn();
      const {driver, dropdownLayoutDriver} = createDriver(buttonWithOptions({onSelect, selectedId: options[0].id}));
      driver.click();
      dropdownLayoutDriver.clickAtOption(0);
      expect(onSelect).not.toBeCalled();
    });

    describe('testkit', () => {
      it('should exist', () => {
        const div = document.createElement('div');
        const dataHook = 'myDataHook';
        const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div>{buttonWithOptions({dataHook})}</div>));
        const buttonWithOptionsTestkit = buttonWithOptionsTestkitFactory({wrapper, dataHook});
        expect(buttonWithOptionsTestkit.driver.exists()).toBeTruthy();
        expect(buttonWithOptionsTestkit.buttonDriver.exists()).toBeTruthy();
        expect(buttonWithOptionsTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
      });
    });

    describe('enzyme testkit', () => {
      it('should exist', () => {
        const dataHook = 'myDataHook';
        const wrapper = mount(buttonWithOptions({dataHook}));
        const buttonWithOptionsTestkit = enzymeButtonWithOptionsTestkitFactory({wrapper, dataHook});
        expect(buttonWithOptionsTestkit.driver.exists()).toBeTruthy();
        expect(buttonWithOptionsTestkit.buttonDriver.exists()).toBeTruthy();
        expect(buttonWithOptionsTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
      });
    });

    describe('appearance', () => {
      it('should be possible to specify the theme of underlying elements', () => {
        const props = {theme: 'material', dataHook: 'myDataHook'};
        const wrapper = mount(buttonWithOptions(props));
        const testkit = enzymeButtonWithOptionsTestkitFactory({wrapper, dataHook: props.dataHook});
        expect(testkit.dropdownLayoutDriver.hasTheme(props.theme)).toBe(true);
      });
    });

  });
};

runButtonWithOptionsTest(buttonWithOptionsDriverFactory);

export {runButtonWithOptionsTest};
