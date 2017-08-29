import ReactTestUtils from 'react-dom/test-utils';
import inputDriverFactory from '../Input/Input.driver';

const datePickerDriverFactory = ({element, wrapper}) => {

  const inputRoot = element && element.children[0].querySelector('.root');
  const inputDriver = inputDriverFactory({element: inputRoot, wrapper});
  const getCalendar = () => element.querySelector('.react-datepicker');
  const getNthDay = n => element.querySelectorAll('[role="option"]:not([class*="outside-month"])')[n];

  const calendarDriver = {
    exists: () => !!element,
    isVisible: () => !!getCalendar(),
    getNthDay: (n = 0) => getNthDay(n),
    triggerOnNthDay: ({n = 0, trigger, event}) => ReactTestUtils.Simulate[trigger](getNthDay(n), event)
  };

  return {
    inputDriver,
    calendarDriver
  };
};

export default datePickerDriverFactory;
