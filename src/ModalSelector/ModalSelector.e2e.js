// import eyes from 'eyes.it';
// import moment from 'moment';
// import {modalSelectorTestkitFactory, getStoryUrl} from '../../testkit/protractor';

// describe('ModalSelector', () => {
//   const storyUrl = getStoryUrl('9. Modals', 'ModalSelector');

//   beforeEach(() => {
//     browser.get(storyUrl);
//   });

//   // eyes.it('should not open calendar when disabled', () => {
//   //   const {inputDriver, calendarDriver} = modalSelectorTestkitFactory({dataHook: 'story-datepicker-disabled'});

//   //   inputDriver.click();

//   //   expect(calendarDriver.exists()).toBe(false);
//   // });

//   // eyes.it('should not close calendar on selecting date with click when shouldCloseOnSelect prop set to false', () => {
//   //   const {inputDriver, calendarDriver} = modalSelectorTestkitFactory({dataHook: 'story-datepicker-should-close-on-select'});

//   //   inputDriver.click();
//   //   calendarDriver.clickOnNthAvailableDay(1);

//   //   expect(calendarDriver.exists()).toBe(true);
//   //   expect(calendarDriver.isVisible()).toBe(true);
//   // });

//   // describe('default', () => {
//   //   const testkit = modalSelectorTestkitFactory({dataHook: 'story-datepicker-default'});

//   //   eyes.it('should show inputDriver', () => {
//   //     const {inputDriver} = testkit;

//   //     expect(inputDriver.isVisible()).toBe(true);
//   //   });

//   //   eyes.it('should open calendar when click on inputDriver', () => {
//   //     const {inputDriver, calendarDriver} = testkit;

//   //     inputDriver.click();

//   //     expect(calendarDriver.exists()).toBe(true);
//   //     expect(calendarDriver.isVisible()).toBe(true);
//   //   });

//   //   eyes.it('should close calendar on selecting date with click', () => {
//   //     const {inputDriver, calendarDriver} = testkit;

//   //     inputDriver.click();
//   //     calendarDriver.clickOnNthAvailableDay(1);

//   //     expect(calendarDriver.exists()).toBe(false);
//   //   });

//   //   eyes.it('should close calendar on Escape key', () => {
//   //     const {inputDriver, calendarDriver} = testkit;

//   //     inputDriver.click();
//   //     expect(calendarDriver.exists()).toBe(true);

//   //     inputDriver.pressEscKey();
//   //     expect(calendarDriver.exists()).toBe(false);
//   //   });

//   //   eyes.it('should close calendar on Tab key', () => {
//   //     const {inputDriver, calendarDriver} = testkit;

//   //     inputDriver.click();
//   //     expect(calendarDriver.exists()).toBe(true);

//   //     inputDriver.pressTabKey();
//   //     expect(calendarDriver.exists()).toBe(false);
//   //   });

//   //   eyes.it('should not change date', () => {
//   //     const today = moment('03/09/2017', 'DD/MM/YYYY').format('DD/MM/YYYY');
//   //     const {inputDriver} = testkit;

//   //     inputDriver.click();
//   //     inputDriver.pressEnterKey();

//   //     expect(inputDriver.getValue()).toBe(today);
//   //   });

//   //   eyes.it('should select next day date', () => {
//   //     const tomorrow = moment('03/09/2017', 'DD/MM/YYYY').add(1, 'days').format('DD/MM/YYYY');
//   //     const {inputDriver} = testkit;

//   //     inputDriver.click();
//   //     inputDriver.pressArrowRightKey();
//   //     inputDriver.pressEnterKey();

//   //     expect(inputDriver.getValue()).toBe(tomorrow);
//   //   });
//   // });

//   // describe('with year and month dropdown', () => {
//   //   const testkit = modalSelectorTestkitFactory({dataHook: 'story-datepicker-year-month-dropdown'});

//   //   eyes.it('should select 2027 year', () => {
//   //     const {inputDriver, calendarDriver} = testkit;

//   //     inputDriver.click();
//   //     calendarDriver.openYearDropdownOptions();
//   //     calendarDriver.clickOnNthYear();
//   //     calendarDriver.clickOnNthAvailableDay();

//   //     expect(inputDriver.getValue()).toBe('01/01/2027');
//   //   });

//   //   eyes.it('should select February', () => {
//   //     const {inputDriver, calendarDriver} = testkit;

//   //     inputDriver.click();
//   //     calendarDriver.openMonthDropdownOptions();
//   //     calendarDriver.clickOnNthMonth(2);
//   //     calendarDriver.clickOnNthAvailableDay();

//   //     expect(inputDriver.getValue()).toBe('01/02/2017');
//   //   });

//   //   eyes.it('should select January and 2027 year', () => {
//   //     const {inputDriver, calendarDriver} = testkit;

//   //     inputDriver.click();
//   //     calendarDriver.openYearDropdownOptions();
//   //     calendarDriver.clickOnNthYear();
//   //     calendarDriver.openMonthDropdownOptions();
//   //     calendarDriver.clickOnNthMonth();
//   //     calendarDriver.clickOnNthAvailableDay();

//   //     expect(inputDriver.getValue()).toBe('01/01/2027');
//   //   });
//   // });
// });
