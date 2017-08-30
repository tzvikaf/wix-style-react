import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';
import {createDriverFactory} from '../test-common';
import moment from 'moment';
import applyPolyfills from './Polyfills';
import {datePickerTestkitFactory} from '../../testkit/index';
import {datePickerTestkitFactory as enzymeDatePickerTestkitFactory} from '../../testkit/enzyme';
import datePickerDriverFactory from './DatePicker.driver';
import Input from '../Input';
import DatePicker from './DatePicker';

describe('DatePicker', () => {
  const createDriver = createDriverFactory(datePickerDriverFactory);
  let onChange;

  applyPolyfills(window, global);

  beforeEach(() => {
    onChange = jest.fn();
  });

  describe('date picker input', () => {
    it('should exist', () => {
      const {calendarDriver} = createDriver(<DatePicker onChange={onChange}/>);

      expect(calendarDriver.exists()).toBeTruthy();
    });

    it('should set inputDataHook from props', () => {
      const {inputDriver} = createDriver(<DatePicker onChange={onChange} inputDataHook={'inputDataHook'}/>);

      expect(inputDriver.getDataHook()).toBe('inputDataHook');
    });

    it('should set datePicker disabled from props', () => {
      const {inputDriver} = createDriver(<DatePicker onChange={onChange} disabled/>);

      expect(inputDriver.isDisabled()).toBeTruthy();
    });

    it('should not open calendar when disabled', () => {
      const {inputDriver, calendarDriver} = createDriver(<DatePicker onChange={onChange} disabled/>);

      inputDriver.trigger('click');
      expect(calendarDriver.isVisible()).toBe(false);
    });

    it('should show correct value from props', () => {
      const date = new Date(2017, 9, 2);
      const {inputDriver} = createDriver(<DatePicker onChange={onChange} value={moment(date)}/>);

      expect(inputDriver.getValue()).toBe('10/02/2017');
    });

    it('should show correct value from props depends on date format', () => {
      const date = new Date(2017, 9, 2);
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange} value={moment(date)}
        dateFormat={'DD/MM/YYYY'}
        />);

      expect(inputDriver.getValue()).toBe('02/10/2017');
    });

    it('should set placeholder from placeholderText property', () => {
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange}
        placeholderText={'Datepicker test placeholder'}
        />);

      expect(inputDriver.getPlaceholder()).toBe('Datepicker test placeholder');
    });

    it('should set placeholder from placeholder property for customInput', () => {
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange}
        customInput={<Input placeholder={'Input test placeholder'}/>}
        />);

      expect(inputDriver.getPlaceholder()).toBe('Input test placeholder');
    });

    it('should set placeholder from placeholder property for customInput even if placeholderText property was specified', () => {
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange}
        customInput={<Input placeholder={'customInputPlaceholder'}/>}
        placeholderText={'textPlaceholder'}
        />);

      expect(inputDriver.getPlaceholder()).toBe('customInputPlaceholder');
    });

    it('should be readonly', () => {
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange}
        readOnly
        />);

      expect(inputDriver.getReadOnly()).toBeTruthy();
    });

    it('should not be readonly', () => {
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange}
        />);

      expect(inputDriver.getReadOnly()).toBeFalsy();
    });

    it('has prefix by default', () => {
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange}
        />);

      expect(inputDriver.hasPrefix()).toBe(true);
    });

    it('has custom prefix', () => {
      const {inputDriver} = createDriver(<DatePicker
        onChange={onChange}
        prefix={<span>#</span>}
        />);

      expect(inputDriver.hasPrefix()).toBe(true);
    });
  });

  describe('calendar', () => {
    it('should not render datePicker on start', () => {
      const {calendarDriver} = createDriver(<DatePicker onChange={onChange}/>);

      expect(calendarDriver.isVisible()).toBe(false);
    });

    describe('should be shown', () => {
      it('on select with ArrowUp key', () => {
        const value = moment(new Date(2017, 5, 2));
        const {inputDriver, calendarDriver} = createDriver(<DatePicker value={value} onChange={onChange}/>);

        inputDriver.trigger('keyDown', {key: 'ArrowUp'});
        expect(calendarDriver.isVisible()).toBe(true);
      });

      it('on click on datePickerInput', () => {
        const {calendarDriver, inputDriver} = createDriver(<DatePicker onChange={onChange}/>);

        inputDriver.trigger('click');
        expect(calendarDriver.isVisible()).toBe(true);
      });
    });

    describe('should be closed', () => {
      it('on select date with Enter key', () => {
        const value = moment(new Date(2017, 5, 2));
        const {inputDriver, calendarDriver} = createDriver(<DatePicker value={value} onChange={onChange}/>);

        inputDriver.trigger('click');
        inputDriver.trigger('keyDown', {key: 'ArrowRight'});
        inputDriver.trigger('keyDown', {key: 'Enter'});

        expect(calendarDriver.isVisible()).toBe(false);
      });

      it('on select date with click', () => {
        const {inputDriver, calendarDriver} = createDriver(<DatePicker onChange={onChange}/>);

        inputDriver.trigger('click');
        calendarDriver.triggerOnNthDay({trigger: 'click'});

        expect(calendarDriver.isVisible()).toBe(false);
      });
    });

    it('should not close calendar on select when "shouldCloseOnSelect" property is false', () => {
      const {inputDriver, calendarDriver} = createDriver(
        <DatePicker
          onChange={onChange}
          shouldCloseOnSelect={false}
          />
      );

      inputDriver.trigger('click');
      calendarDriver.triggerOnNthDay({trigger: 'click'});

      expect(calendarDriver.isVisible()).toBe(true);
    });

    it('should call onChange on click on available day in datePicker', () => {
      const value = moment(new Date(2017, 7, 1));
      const expectedValue = moment(new Date(2017, 7, 2));
      const {calendarDriver, inputDriver} = createDriver(
        <DatePicker
          value={value}
          onChange={onChange}
          />
      );
      inputDriver.trigger('click');
      calendarDriver.triggerOnNthDay({trigger: 'click', n: 1});

      const newValue = onChange.mock.calls[0][0];

      expect(onChange).toHaveBeenCalled();
      expect(newValue.diff(expectedValue)).toBe(0);
    });

    it('should not give an ability to select past dates if it is specified in props', () => {
      const date = new Date(2015, 9, 2);
      const {calendarDriver, inputDriver} = createDriver(
        <DatePicker
          excludePastDates={true} onChange={onChange}
          value={moment(date)}
          />
      );

      inputDriver.trigger('click');
      calendarDriver.triggerOnNthDay({trigger: 'click'});

      expect(onChange).not.toHaveBeenCalled();
      expect(calendarDriver.isVisible()).toBe(true);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'dataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div>
          <DatePicker
            onChange={() => {
            }}
            dataHook={dataHook}
            />
        </div>
      ));
      const {calendarDriver, inputDriver} = datePickerTestkitFactory({wrapper, dataHook});

      expect(calendarDriver.exists()).toBe(true);
      expect(inputDriver.exists()).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'dataHook';
      const wrapper = mount(<DatePicker
        onChange={() => {
        }}
        dataHook={dataHook}
        />);
      const {calendarDriver, inputDriver} = enzymeDatePickerTestkitFactory({wrapper, dataHook});

      expect(calendarDriver.exists()).toBe(true);
      expect(inputDriver.exists()).toBe(true);
    });
  });
});
