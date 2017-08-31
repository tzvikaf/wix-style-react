import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Template from './TextLinkTemplate';
import RadioGroup from '../../../src/RadioGroup';
import Label from '../../../src/Label';
import Checkbox from '../../../src/Checkbox';
import Input from '../../../src/Input';

import styles from './ExampleButton.scss';

class ButtonTextLink extends Component {

  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    size: 'medium',
    darkBackground: false,
    link: 'https://www.wix.com',
    underlineStyle: 'hover',
    children: 'Click me'
  };

  render() {
    return (
      <from className={styles.form}>
        <div className={styles.input}>
          <h1>Text Link</h1>

          <div className={styles.option}>
            <Label>Link</Label>
            <div className={styles.flex}>
              <Input value={this.state.link} onChange={event => this.setState({link: event.target.value})}/>
            </div>
          </div>

          <div className={styles.option}>
            <Label>Text</Label>
            <div className={styles.flex}>
              <Input value={this.state.children} onChange={event => this.setState({children: event.target.value})}/>
            </div>
          </div>

          <div className={styles.option}>
            <Label>Type</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.size}
                onChange={size => this.setState({size})}
                >
                <RadioGroup.Radio value="small">Small</RadioGroup.Radio>
                <RadioGroup.Radio value="medium">Medium</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

          <div className={styles.option}>
            <Label>Background</Label>
            <div className={styles.flex}>
              <Checkbox checked={this.state.darkBackground} onChange={() => this.setState({darkBackground: !this.state.darkBackground})}>Dark background</Checkbox>
            </div>
          </div>

          <div className={styles.option}>
            <Label>Underline</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.underlineStyle}
                onChange={underlineStyle => this.setState({underlineStyle})}
                >
                <RadioGroup.Radio value="always">Always</RadioGroup.Radio>
                <RadioGroup.Radio value="hover">Hover</RadioGroup.Radio>
                <RadioGroup.Radio value="never">Never</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

        </div>

        <div className={styles[this.state.darkBackground ? 'output-darkblue' : 'output']}>
          <div className={`${styles[this.state.theme]} ${styles.exampleWrapper}`}>
            <Template {...this.state} onChange={this.props.onChange}/>
          </div>
        </div>
      </from>
    );
  }
}

export default ButtonTextLink;
