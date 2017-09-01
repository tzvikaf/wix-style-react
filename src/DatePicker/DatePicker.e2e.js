import eyes from 'eyes.it';
import moment from 'moment';
import {datePickerTestkitFactory, getStoryUrl} from '../../testkit/protractor';

describe('DatePicker', () => {
  const storyUrl = getStoryUrl('Core', 'DatePicker');

  beforeEach(() => {
    browser.get(storyUrl);
  });

  eyes.it('should not open calendar when disabled', () => {
    const {inputDriver, calendar} = datePickerTestkitFactory({dataHook: 'story-datepicker-disabled'});

    inputDriver.click();

    expect(calendar.exists()).toBe(false);
  });

  eyes.it('should not close calendar on selecting date with click when shouldCloseOnSelect prop set to false', () => {
    const {inputDriver, calendar} = datePickerTestkitFactory({dataHook: 'story-datepicker-should-close-on-select'});

    inputDriver.click();
    calendar.clickOnNthAvailableDay(1);

    expect(calendar.exists()).toBe(true);
    expect(calendar.isVisible()).toBe(true);
  });

  describe('default', () => {
    const testkit = datePickerTestkitFactory({dataHook: 'story-datepicker-default'});

    eyes.it('should show inputDriver', () => {
      const {inputDriver} = testkit;

      expect(inputDriver.isVisible()).toBe(true);
    });

    eyes.it('should open calendar when click on inputDriver', () => {
      const {inputDriver, calendar} = testkit;

      inputDriver.click();

      expect(calendar.exists()).toBe(true);
      expect(calendar.isVisible()).toBe(true);
    });

    eyes.it('should close calendar on selecting date with click', () => {
      const {inputDriver, calendar} = testkit;

      inputDriver.click();
      calendar.clickOnNthAvailableDay(1);

      expect(calendar.exists()).toBe(false);
    });

    eyes.it('should close calendar on Escape key', () => {
      const {inputDriver, calendar} = testkit;

      inputDriver.click();
      expect(calendar.exists()).toBe(true);

      inputDriver.pressEscKey();
      expect(calendar.exists()).toBe(false);
    });

    eyes.it('should close calendar on Tab key', () => {
      const {inputDriver, calendar} = testkit;

      inputDriver.click();
      expect(calendar.exists()).toBe(true);

      inputDriver.pressTabKey();
      expect(calendar.exists()).toBe(false);
    });

    eyes.it('should not change date', () => {
      const today = moment().format('DD/MM/YYYY');
      const {inputDriver} = testkit;

      inputDriver.click();
      inputDriver.pressEnterKey();

      expect(inputDriver.getValue()).toBe(today);
    });

    eyes.it('should select next day date', () => {
      const tomorrow = moment().add(1, 'days').format('DD/MM/YYYY');
      const {inputDriver} = testkit;

      inputDriver.click();
      inputDriver.pressArrowRightKey();
      inputDriver.pressEnterKey();

      expect(inputDriver.getValue()).toBe(tomorrow);
    });
  });

  describe('with year and month dropdown', () => {
    const testkit = datePickerTestkitFactory({dataHook: 'story-datepicker-year-month-dropdown'});

    eyes.it('should select 2027 year', () => {
      const {inputDriver, calendar} = testkit;

      inputDriver.click();
      calendar.openYearDropdownOptions();
      calendar.clickOnNthYear();
      calendar.clickOnNthAvailableDay();

      expect(inputDriver.getValue()).toBe('01/01/2027');
    });

    eyes.it('should select February', () => {
      const {inputDriver, calendar} = testkit;

      inputDriver.click();
      calendar.openMonthDropdownOptions();
      calendar.clickOnNthMonth(2);
      calendar.clickOnNthAvailableDay();

      expect(inputDriver.getValue()).toBe('01/02/2017');
    });

    eyes.it('should select January and 2027 year', () => {
      const {inputDriver, calendar} = testkit;

      inputDriver.click();
      calendar.openYearDropdownOptions();
      calendar.clickOnNthYear();
      calendar.openMonthDropdownOptions();
      calendar.clickOnNthMonth();
      calendar.clickOnNthAvailableDay();

      expect(inputDriver.getValue()).toBe('01/01/2027');
    });
  });
});
