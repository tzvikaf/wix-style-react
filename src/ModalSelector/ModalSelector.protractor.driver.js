const modalSelectorDriverFactory = component => {
  const getSearchInput = () => component.$('input');
  // const getCalendar = () => component.$('.react-datepicker');
  // const getNthAvailableDay = n => component.$$('[role="option"]:not([class*="outside-month"])').get(n);
  // const getYearDropdown = () => component.$('[class$="year-read-view"]');
  // const getNthYear = n => component.$$('[class*="year-option"]').get(n);
  // const getMonthsDropdown = () => component.$('[class$="month-read-view"]');
  // const getNthMonth = n => component.$$('[class*="month-option"]').get(n);

  return {
    inputDriver: {
      exists: () => getSearchInput().isPresent(),
      isVisible: () => getSearchInput().isDisplayed(),
      getValue: () => getSearchInput().getAttribute('value'),
      click: () => getSearchInput().click(),
      pressEnterKey: () => getSearchInput().sendKeys(protractor.Key.ENTER),
      pressEscKey: () => getSearchInput().sendKeys(protractor.Key.ESCAPE),
      pressTabKey: () => getSearchInput().sendKeys(protractor.Key.TAB),
      pressArrowRightKey: () => getSearchInput().sendKeys(protractor.Key.ARROW_RIGHT),
    }
  };
};

export default modalSelectorDriverFactory;
