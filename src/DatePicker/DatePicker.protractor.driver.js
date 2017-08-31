const datePickerDriverFactory = component => {
  const getInput = () => component.$('[data-hook="datepicker-input"] input');

  return {
    input: {
      isVisible: () => !!getInput()
    },
    calendar: {}
  };
};

export default datePickerDriverFactory;
