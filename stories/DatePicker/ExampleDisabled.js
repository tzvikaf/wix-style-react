import React from 'react';
import {DatePicker} from 'wix-style-react';
import moment from 'moment';

class DisabledDatePicker extends React.Component {
  constructor(params) {
    super(params);

    this.state = {
      value: moment()
    };
  }

  render() {
    return (
      <DatePicker
        dataHook={'story-datepicker-disabled'}
        value={this.state.value}
        onChange={value => this.setState({value})}
        dateFormat="DD/MM/YYYY"
        disabled
        />
    );
  }
}

export default DisabledDatePicker;
