import moment from 'moment';

function datePickerDriverFactory(component, wrapper = document.body) {
  return {
    getDatePickerPopup: () => wrapper.querySelector('.react-datepicker'),
    navigateToNextMonth() {
      this.getDatePickerPopup().querySelector('.react-datepicker__navigation--next').click();
    },
    navigateToPreviousMonth() {
      this.getDatePickerPopup().querySelector('.react-datepicker__navigation--previous').click();
    },
    getCurrentMonth() {
      const monthFieldContent = this.getDatePickerPopup()
        .querySelector('.react-datepicker__current-month')
        .textContent;
      return moment(monthFieldContent, ['MMMM YYYY']);
    },
    getSelectedDate() {
      return this.getDatePickerInput().value;
    },
    getDatePickerInput: () => component.querySelector('input'),
    showDatePickerModal() {
      this.getDatePickerInput().click();
      if (!this.getDatePickerPopup()) {
        throw new Error(
          `In order to show modal, DatePicker requires an app to be mounted inside document.body`
        );
      }
    },
    pickDay(day) {
      this.getDatePickerPopup().querySelector(`[aria-label='day-${day}']`).click();
    },
    selectDate(newDate) {
      this.showDatePickerModal();
      const currentMonth = this.getCurrentMonth();
      const monthDiff = newDate.clone().startOf('month').diff(currentMonth, 'month');

      for (let i = 0; i < Math.abs(monthDiff); i++) {
        if (monthDiff > 0) {
          this.navigateToNextMonth();
        } else {
          this.navigateToPreviousMonth();
        }
      }

      this.pickDay(newDate.date());
    }
  };
}

export {datePickerDriverFactory};
