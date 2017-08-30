import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';
import {TextLink} from 'wix-style-react/Backoffice';

export class Form extends Component {

  componentDidUpdate(props) {
    props.onChange(reactElementToJSXString(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(reactElementToJSXString(this.getComponent()));
  }

  getComponent() {
    return (
      <TextLink
        size={this.props.size}
        darkBackground={this.props.darkBackground}
        link={this.props.link}
        forceUnderline={this.props.forceUnderline}
        >
        {this.props.children}
      </TextLink>
    );
  }

  render() {
    return this.getComponent();
  }
}

Form.propTypes = {
  size: PropTypes.string.isRequired,
  darkBackground: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  forceUnderline: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired
};

export default Form;

