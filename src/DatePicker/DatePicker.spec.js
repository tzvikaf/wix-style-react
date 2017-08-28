import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import datePickerDriverFactory from './DatePicker.driver';
import {createDriverFactory} from '../test-common';
import {datePickerTestkitFactory} from '../../testkit';
import DatePicker from './DatePicker';
import {datePickerTestkitFactory as enzymeDatePickerTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

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

})