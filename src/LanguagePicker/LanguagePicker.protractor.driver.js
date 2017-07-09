import buttonWithOptionsDriverFactory from '../ButtonWithOptions/ButtonWithOptions.protractor.driver';

const languagePickerDriverFactory = component => ({
  ...buttonWithOptionsDriverFactory(component)
});

export default languagePickerDriverFactory;
