const datePickerDriverFactory = component => ({
  input: {
    getInput: () => component.$('[data-hook="datepicker-input"] input'),
    isVisible: () => !!this.getInput()
  },
  calendar: {}
});

export default datePickerDriverFactory;