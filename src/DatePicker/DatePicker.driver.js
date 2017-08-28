import ReactTestUtils from 'react-dom/test-utils';

const datePickerDriverFactory = ({element}) => {

  const getDatePickerOption = (index = 0) => element.querySelectorAll('[role="option"]:not([class*="outside-month"])')[index];
  const getElementByDataHook = dataHook => element.querySelector(`[data-hook="${dataHook}"]`);
  const getDatePickerInput = () => element.querySelector('input');
  const getDatePickerInputValue = () => getDatePickerInput().value;
  const getDatePicker = () => element.querySelector('.react-datepicker');

  return {
    exists: () => !!element,
    clickOn: element => ReactTestUtils.Simulate.click(element),
    getDatePickerOption,
    getElementByDataHook,
    getDatePickerInput,
    getDatePickerInputValue,
    getDatePicker
  };
};

export default datePickerDriverFactory;
