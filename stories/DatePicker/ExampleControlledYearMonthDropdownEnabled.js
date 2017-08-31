import React from 'react';
import {DatePicker} from 'wix-style-react';
import moment from 'moment';

class ControlledDatePicker extends React.Component {
  constructor(params) {
    super(params);

    this.state = {
      value: moment('01/09/2017')
    };
  }

  render() {
    return (
      <DatePicker
        dataHook={'story-datepicker-year-month-dropdown'}
        value={this.state.value}
        onChange={value => this.setState({value})}
        dateFormat="DD/MM/YYYY"
        showYearDropdown
        showMonthDropdown
        />
    );
  }
}

export default ControlledDatePicker;
