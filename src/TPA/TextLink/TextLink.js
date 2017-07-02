import React from 'react';
import {any, oneOf, string} from 'prop-types';
import classNames from 'classnames';
import WixComponent from '../../BaseComponents/WixComponent';
import tpaStyleInjector from '../TpaStyleInjector';

let styles = {locals: {}};
try {
  styles = require('!css-loader?modules&camelCase&localIdentName="[path][name]__[local]__[hash:base64:5]"!sass-loader!./TextLink.scss');
} catch (e) {}

class TextLink extends WixComponent {
  static propTypes = {
    link: string.isRequired,
    id: string,
    children: string,
    disabled: bool,
    rel: string,
    target: oneOf(['_blank', '_parent', '_self', '_top', 'framename'])
  };

  static defaultProps = {
    disabled: false,
    rel: null,
    target: null,
  };

  render() {
    const {children, className, disabled, rel, target, link} = this.props;
    const {locals} = styles;
    const classes = (classNames([locals['wix-style-react-text-link']], className)).trim();

    const props = {
      href: link,
      onClick: event => disabled && event.preventDefault(),
      rel,
      target
    };

    return (
      <a className={classes} {...props}>
        {children}
      </a>
    );
  }
}

TextLink.displayName = 'TextLink';

export default tpaStyleInjector(TextLink, styles);
