import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Template from './Template';
import Label from '../../../src/Label';
import Input from '../../../src/Input';
import ToggleSwitch from '../../../src/ToggleSwitch';
import IconChooser from './IconChooser';
import * as Icons from 'wix-style-react/Icons';

import styles from './ExampleButton.scss';

class ButtonTransparent extends Component {

  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    disabled: false,
    height: 'small',
    theme: 'transparent',
    text: 'Click On Me'
  };

  render() {
    return (
      <from className={styles.form}>
        <div className={styles.input}>

          <div className={styles.option}>
            <Label>Disabled</Label>
            <div className={styles.flex}>
              <ToggleSwitch
                size="small"
                checked={this.state.disabled}
                onChange={() => this.setState({disabled: !this.state.disabled})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Prefix Icon</Label>
            <div className={styles.flex}>
              <IconChooser
                onSelect={option => this.setState({prefixIcon: React.createElement(Icons[option.id])})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Suffix Icon</Label>
            <div className={styles.flex}>
              <IconChooser
                onSelect={option => this.setState({suffixIcon: React.createElement(Icons[option.id])})}
                />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Text</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.text}
                onChange={e => this.setState({text: e.target.value})}
                />
            </div>
          </div>

        </div>

        <div className={styles.output}>
          <div className={`${styles[this.state.theme]} ${styles.exampleWrapper}`}>
            <Template {...this.state} onChange={this.props.onChange}/>
          </div>
        </div>
      </from>
    );
  }
}

export default ButtonTransparent;
