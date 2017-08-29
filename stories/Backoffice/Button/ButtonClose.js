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
    theme: 'close-standard',
    iconOnly: true,
    height: 'medium'
  };

  render() {
    return (
      <form className={styles.form}>
        <div className={styles.input}>

          <div className={styles.option}>
            <Label>Type</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.theme}
                onChange={theme => this.setState({theme})}
                >
                <RadioGroup.Radio value="close-standard">Standard</RadioGroup.Radio>
                <RadioGroup.Radio value="close-dark">Dark</RadioGroup.Radio>
                <RadioGroup.Radio value="close-transparent">Transparent</RadioGroup.Radio>
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
                <RadioGroup.Radio value="medium">Regular</RadioGroup.Radio>
                <RadioGroup.Radio value="large">Large</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

        </div>

        <div className={styles.output}>
          <div className={`${styles[this.state.theme]} ${styles.exampleWrapper}`}>
            <Template {...this.state} onChange={this.props.onChange}/>
          </div>
        </div>
      </form>
    );
  }
}

export default ButtonIcon;
