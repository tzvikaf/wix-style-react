import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from 'wix-style-react/Input';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '200px',
  lineHeight: '22px'
};

class ControlledInput extends Component {
  static propTypes = {
    value: PropTypes.bool
  };

  constructor({value = ''}) {
    super();
    this.state = {value};
  }

  render() {
    const onChange = event => this.setState({value: event.target.value});
    const onClear = () => {
      this.setState({value: ''});
      this.refs.inputtest.focus();
    };

    return (
      <Input {...this.props} error={this.state.value === 'Starwars'} value={this.state.value} onChange={onChange} onClear={onClear}/>
    );
  }
}

const Example = ({theme}) =>
  <div className="ltr" style={style}>
    <span>This shows an error for &quot;Starwars&quot;</span>
    <ControlledInput theme={theme}/>
  </div>;

Example.propTypes = {
  theme: PropTypes.string
};

export default Example;
