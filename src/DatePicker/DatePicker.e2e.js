import eyes from 'eyes.it';
import moment from 'moment';
import {datePickerTestkitFactory, getStoryUrl} from '../../testkit/protractor';

describe('DatePicker', () => {
  const storyUrl = getStoryUrl('Core', 'DatePicker');

  beforeEach(() => {
    browser.get(storyUrl);
  });

  eyes.it('should not open calendar when disabled', () => {
    const {input, calendar} = datePickerTestkitFactory({dataHook: 'story-datepicker-disabled'});

    input.click();

    expect(calendar.exists()).toBe(false);
  });

  eyes.it('should not close calendar on selecting date with click when shouldCloseOnSelect prop set to false', () => {
    const {input, calendar} = datePickerTestkitFactory({dataHook: 'story-datepicker-should-close-on-select'});

    input.click();
    calendar.clickOnNthAvailableDay(1);

    expect(calendar.exists()).toBe(true);
    expect(calendar.isDisplayed()).toBe(true);
  });

  describe('default', () => {
    const testkit = datePickerTestkitFactory({dataHook: 'story-datepicker-default'});

    eyes.it('should show input', () => {
      const {input} = testkit;

      expect(input.isDisplayed()).toBe(true);
    });

    eyes.it('should open calendar when click on input', () => {
      const {input, calendar} = testkit;

      input.click();

      expect(calendar.exists()).toBe(true);
      expect(calendar.isDisplayed()).toBe(true);
    });

    eyes.it('should close calendar on selecting date with click', () => {
      const {input, calendar} = testkit;

      input.click();
      calendar.clickOnNthAvailableDay(1);

      expect(calendar.exists()).toBe(false);
    });

    eyes.it('should close calendar on Escape key', () => {
      const {input, calendar} = testkit;

      input.click();
      expect(calendar.exists()).toBe(true);

      input.pressEscKey();
      expect(calendar.exists()).toBe(false);
    });

    eyes.it('should close calendar on Tab key', () => {
      const {input, calendar} = testkit;

      input.click();
      expect(calendar.exists()).toBe(true);

      input.pressTabKey();
      expect(calendar.exists()).toBe(false);
    });

    eyes.it('should not change date', () => {
      const today = moment().format('DD/MM/YYYY');
      const {input} = testkit;

      input.click();
      input.pressEnterKey();

      expect(input.getValue()).toBe(today);
    });

    eyes.it('should select next day date', () => {
      const tomorrow = moment().add(1, 'days').format('DD/MM/YYYY');
      const {input} = testkit;

      input.click();
      input.pressArrowRightKey();
      input.pressEnterKey();

      expect(input.getValue()).toBe(tomorrow);
    });
  });

  describe('with year and month dropdown', () => {
    const testkit = datePickerTestkitFactory({dataHook: 'story-datepicker-year-month-dropdown'});

    eyes.it('should select 2027 year', () => {
      const {input, calendar} = testkit;

      input.click();
      calendar.openYearDropdownOptions();
      calendar.clickOnNthYear();
      calendar.clickOnNthAvailableDay();

      expect(input.getValue()).toBe('01/01/2027');
    });

    eyes.it('should select February', () => {
      const {input, calendar} = testkit;

      input.click();
      calendar.openMonthDropdownOptions();
      calendar.clickOnNthMonth(2);
      calendar.clickOnNthAvailableDay();

      expect(input.getValue()).toBe('01/02/2017');
    });

    eyes.it('should select January and 2027 year', () => {
      const {input, calendar} = testkit;

      input.click();
      calendar.openYearDropdownOptions();
      calendar.clickOnNthYear();
      calendar.openMonthDropdownOptions();
      calendar.clickOnNthMonth();
      calendar.clickOnNthAvailableDay();

      expect(input.getValue()).toBe('01/01/2027');
    });
  });
});
