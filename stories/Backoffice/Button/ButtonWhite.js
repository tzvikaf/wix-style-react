import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Template from './Template';
import RadioGroup from '../../../src/RadioGroup';
import Label from '../../../src/Label';
import Input from '../../../src/Input';
import ToggleSwitch from '../../../src/ToggleSwitch';
import IconChooser from './IconChooser';
import * as Icons from 'wix-style-react/Icons';

import styles from './ExampleButton.scss';

class ButtonWhite extends Component {

  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    disabled: false,
    theme: 'whiteblueprimary',
    text: 'Click On Me',
    height: 'medium'
  };

  render() {
    return (
      <from className={styles.form}>
        <div className={styles.input}>

          <div className={styles.option}>
            <Label>Type</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.theme}
                onChange={theme => this.setState({theme})}
                >
                <RadioGroup.Radio value="whiteblueprimary">Primary</RadioGroup.Radio>
                <RadioGroup.Radio value="whitebluesecondary">Secondary</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

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

          <div className={styles.option}>
            <Label>Size</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.height}
                onChange={height => this.setState({height})}
                >
                <RadioGroup.Radio value="small">Small</RadioGroup.Radio>
                <RadioGroup.Radio value="medium">Regular</RadioGroup.Radio>
                <RadioGroup.Radio value="large">Large</RadioGroup.Radio>
                <RadioGroup.Radio value="x-large">x-large</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

        </div>

        <div className={styles['output-darkblue']}>
          <div className={`${styles[this.state.theme]} ${styles.exampleWrapper}`}>
            <Template {...this.state} onChange={this.props.onChange}/>
          </div>
        </div>
      </from>
    );
  }
}

export default ButtonWhite;
