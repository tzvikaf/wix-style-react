import React from 'react';
import DatePicker from './DatePicker';
import {datePickerDriverFactory} from './DatePicker.driver';
import {mount} from 'enzyme';
import * as Sinon from 'sinon';
import moment from 'moment';
import $ from 'jquery';

describe('DatePicker', () => {
  let driver, onChangeMock, sinon;

  beforeAll(() => {
    $(`<div class="date-picker-root"/>`).appendTo(document.body);
  });

  beforeEach(() => {
    const datePickerRoot = $('.date-picker-root')[0];

    sinon = Sinon.sandbox.create();
    onChangeMock = sinon.spy();

    mount(
      <DatePicker onChange={onChangeMock}/>,
      {attachTo: datePickerRoot}
    );

    driver = datePickerDriverFactory(datePickerRoot);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('calendar', () => {
    it('calendar is shown', () => {
      driver.showDatePickerModal();
      expect(driver.getDatePickerPopup()).not.toBeNull();
    });

    it('calendar is not shown', () => {
      expect(driver.getDatePickerPopup()).toBeNull();
    });

    describe('select a date', () => {
      it('calendar is closed', () => {
        driver.selectDate(moment('2016-03-16'));
        expect(driver.getDatePickerPopup()).toBeNull();
      });

      it('onChange reports the selected date', () => {
        driver.selectDate(moment('2016-03-16'));
        const changeDateCallbackValue = onChangeMock.getCall(0).args[0];
        expect(changeDateCallbackValue.toISOString()).toEqual(moment('2016-03-16').toISOString());
      });
    });

  });

});
