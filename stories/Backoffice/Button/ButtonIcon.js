import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Template from './Template';
import RadioGroup from '../../../src/RadioGroup';
import Label from '../../../src/Label';
import ToggleSwitch from '../../../src/ToggleSwitch';

import styles from './ExampleButton.scss';

class ButtonIcon extends Component {

  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    disabled: false,
    theme: 'icon-standard',
    iconOnly: true,
    height: 'medium'
  };

  render() {
    let backgroundStyle = 'output-lightblue';
    if (['icon-standard', 'icon-standardsecondary'].indexOf(this.state.theme) >= 0) {
      backgroundStyle = 'output-white';
    } else if (['icon-white', 'icon-whitesecondary'].indexOf(this.state.theme) >= 0) {
      backgroundStyle = 'output-darkblue';
    }

    return (
      <from className={styles.form}>
        <div className={styles.input}>

          <div className={styles.option}>
            <Label>Any icon from Lib</Label>
          </div>

          <div className={styles.option}>
            <Label>Type</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.theme}
                onChange={theme => this.setState({theme})}
                >
                <RadioGroup.Radio value="icon-greybackground">Grey Background</RadioGroup.Radio>
                <RadioGroup.Radio value="icon-standard">Standard Primary</RadioGroup.Radio>
                <RadioGroup.Radio value="icon-standardsecondary">Standard Secondary</RadioGroup.Radio>
                <RadioGroup.Radio value="icon-white">White Primary</RadioGroup.Radio>
                <RadioGroup.Radio value="icon-whitesecondary">White Secondary</RadioGroup.Radio>
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
            <Label>Size</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.height}
                onChange={height => this.setState({height})}
                >
                <RadioGroup.Radio value="small">Small</RadioGroup.Radio>
                <RadioGroup.Radio value="medium">Regular</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

        </div>

        <div className={styles[backgroundStyle]}>
          <div className={`${styles[this.state.theme]} ${styles.exampleWrapper}`}>
            <Template {...this.state} onChange={this.props.onChange}/>
          </div>
        </div>
      </from>
    );
  }
}

export default ButtonIcon;
