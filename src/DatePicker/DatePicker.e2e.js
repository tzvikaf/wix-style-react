import eyes from 'eyes.it';
import {datePickerTestkitFactory, getStoryUrl} from '../../testkit/protractor';

describe('DatePicker', () => {
  const storyUrl = getStoryUrl('Core', 'DatePicker');
  let driver;

  beforeEach(() => {
    browser.get(storyUrl);
  });

  describe('default', () => {
    driver = datePickerTestkitFactory({dataHook: 'datepicker-default'});

    eyes.it('should show input', () => {
      const {input} = driver;

      expect(input.isVisible()).toBe(true);
    });
  });
});
