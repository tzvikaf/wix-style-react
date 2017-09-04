import React from 'react';
import {DatePicker} from 'wix-style-react';
import moment from 'moment';

class CloseOnSelectDatePicker extends React.Component {
  constructor(params) {
    super(params);

    this.state = {
      value: moment('03/09/2017', 'DD/MM/YYYY')
    };
  }

  render() {
    return (
      <DatePicker
        dataHook={'story-datepicker-should-close-on-select'}
        value={this.state.value}
        onChange={value => this.setState({value})}
        dateFormat="DD/MM/YYYY"
        shouldCloseOnSelect={false}
        />
    );
  }
}

export default CloseOnSelectDatePicker;
