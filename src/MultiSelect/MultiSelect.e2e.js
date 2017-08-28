import eyes from 'eyes.it';
import times from 'lodash/times';

import {multiSelectTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';

describe('MultiSelect', async () => {
  const storyUrl = getStoryUrl('Core', 'MultiSelect');

  eyes.it('should add scroll if too high', async () => {
    const driver = multiSelectTestkitFactory({dataHook: 'multi-select'});

    browser.get(storyUrl);

    const isVisible = await waitForVisibilityOf(driver.element());

    if (!isVisible) {
      throw new Error('Cannot find MultiSelect');
    }

    times(12, driver.addTag);
  });
});
