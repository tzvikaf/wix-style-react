import buttonDriverFactory from '../Button/Button.driver';

const floatingTabsDriverFactory = ({element}) => {

  const buttonDrivers = Array.from(element.childNodes).map(buttonWrapper => {
    return buttonDriverFactory(buttonWrapper);
  });

  return {
    exists: () => !!element,
    // clickOnTabAt: index => buttonDrivers[index].click(),
    isActive: index => buttonDrivers[index].hasTheme('fill')
  };
};

export default floatingTabsDriverFactory;
