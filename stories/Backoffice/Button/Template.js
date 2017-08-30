import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';
import {Close} from 'wix-style-react/Icons';
import {Button} from 'wix-style-react/Backoffice';

export class Form extends Component {

  componentDidUpdate(props) {
    props.onChange(reactElementToJSXString(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(reactElementToJSXString(this.getComponent()));
  }

  getComponent() {
    let iconSize = '6px';
    if (this.props.height === 'large') {
      iconSize = '8px';
    }
    if (['close-standard', 'close-dark', 'close-transparent'].indexOf(this.props.theme) < 0) {
      iconSize = '12px';
    }

    const icons = {};
    if (this.props.prefixIcon) {
      icons.prefixIcon = this.props.prefixIcon;
    }

    if (this.props.suffixIcon) {
      icons.suffixIcon = this.props.suffixIcon;
    }

    return (
      <Button
        disabled={this.props.disabled}
        height={this.props.height}
        theme={this.props.theme}
        {...icons}
        >
        {this.props.iconOnly ? <Close size={iconSize}/> : this.props.text}
      </Button>
    );
  }

  render() {
    return this.getComponent();
  }
}

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  iconOnly: PropTypes.bool,
  text: PropTypes.string,
  height: PropTypes.string,
  prefixIcon: PropTypes.node,
  suffixIcon: PropTypes.node
};

export default Form;

