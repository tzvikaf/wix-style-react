import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import datePickerDriverFactory from './DatePicker.driver';
import {createDriverFactory} from '../test-common';
import {datePickerTestkitFactory} from '../../testkit';
import DatePicker from './DatePicker';
import {datePickerTestkitFactory as enzymeDatePickerTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import moment from 'moment';

describe('DatePicker', () => {
    const createDriver = createDriverFactory(datePickerDriverFactory);
    let onChange;

    beforeEach(() => {
        onChange = jest.fn();
    });

    it('should exist', () => {
        const driver = createDriver(<DatePicker onChange={onChange}/>);
        expect(driver.exists()).toBeTruthy();
    });

    it('should set inputDataHook from props', () => {
        const driver = createDriver(<DatePicker onChange={onChange} inputDataHook={'dataHook'}/>);

        expect(Boolean(driver.getElementByDataHook('dataHook'))).toBeTruthy();
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

});