import React from 'react';
import datePickerDriverFactory from './DatePicker.driver';
import {createDriverFactory} from '../test-common';
import DatePicker from './DatePicker';
import moment from 'moment';
import applyPolyfills from './Polyfills';

describe('DatePicker', () => {
  const createDriver = createDriverFactory(datePickerDriverFactory);
  let onChange;

  applyPolyfills(window, global);

  beforeEach(() => {
    onChange = jest.fn();
  });

  describe('date picker input', () => {
    it('should exist', () => {
      const driver = createDriver(<DatePicker onChange={onChange}/>);
      expect(driver.exists()).toBeTruthy();
    });

    it('should set inputDataHook from props', () => {
      const driver = createDriver(<DatePicker onChange={onChange} inputDataHook={'dataHook'}/>);

      expect(driver.getElementByDataHook('dataHook')).toBeTruthy();
    });

    it('should set datePicker disabled from props', () => {
      const driver = createDriver(<DatePicker onChange={onChange} disabled={true}/>);

      expect(driver.getDatePickerInput().hasAttribute('disabled')).toBeTruthy();
    });

    it('should show correct value from props', () => {
      const date = new Date(2017, 9, 2);
      const driver = createDriver(<DatePicker onChange={onChange} value={moment(date)}/>);

      expect(driver.getDatePickerInputValue()).toBe('10/02/2017');
    });

    it('should show correct value from props depends on date format', () => {
      const date = new Date(2017, 9, 2);
      const driver = createDriver(<DatePicker onChange={onChange} value={moment(date)} dateFormat={'DD/MM/YYYY'}/>);

      expect(driver.getDatePickerInputValue()).toBe('02/10/2017');
    });

    it('should set placeholder from props if value is not set', () => {
      const driver = createDriver(<DatePicker onChange={onChange} placeholderText={'placeholderValue'}/>);

      expect(driver.getDatePickerInput().getAttribute('placeholder')).toBe('placeholderValue');
    });
  });

  describe('date picker popover', () => {
    it('should not render datePicker on start', () => {
      const driver = createDriver(<DatePicker onChange={onChange}/>);

      expect(driver.getDatePicker()).toBeFalsy();
    });

    it('should open datePicker on click on datePickerInput', () => {
      const driver = createDriver(<DatePicker onChange={onChange}/>);
      const input = driver.getDatePickerInput();

      driver.clickOn(input);

      expect(driver.getDatePicker()).toBeTruthy();
    });

    it('should call onChange on click on available day in datePicker', () => {
      const driver = createDriver(<DatePicker onChange={onChange}/>);
      const input = driver.getDatePickerInput();
      driver.clickOn(input);
      const option = driver.getDatePickerOption();
      driver.clickOn(option);

      expect(onChange).toHaveBeenCalled();
    });

    it('should close datePicker on click on available day in datePicker', () => {
      const driver = createDriver(<DatePicker onChange={onChange}/>);
      const input = driver.getDatePickerInput();

      driver.clickOn(input);
      const option = driver.getDatePickerOption();
      driver.clickOn(option);

      expect(driver.getDatePicker()).toBeFalsy();
    });

    it('should not give an ability to select past dates if it is specified in props', () => {
      const date = new Date(2015, 9, 2);
      const driver = createDriver(<DatePicker excludePastDates={true} onChange={onChange} value={moment(date)}/>);
      const input = driver.getDatePickerInput();

      driver.clickOn(input);
      const option = driver.getDatePickerOption();
      driver.clickOn(option);

      expect(onChange).not.toHaveBeenCalled();
      expect(driver.getDatePicker()).toBeTruthy();
    });
  });

});
