import eyes from 'eyes.it';
import {languagePickerTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';

describe('LanguagePicker', () => {
  const storyUrl = getStoryUrl('Core', 'LanguagePicker');
  const dataHook = 'story-languagePicker';

  eyes.it('should choose different languages', () => {
    const driver = languagePickerTestkitFactory({dataHook});

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cannot find LanguagePicker')
      .then(() => {
        driver.click();
        driver.getDropdownItem(1).click();
      });
  });
});
