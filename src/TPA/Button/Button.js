import React from 'react';
import {any, oneOf, string} from 'prop-types';
import omit from 'lodash/omit';
import classNames from 'classnames';
import WixComponent from '../../BaseComponents/WixComponent';
import styles from '!css?modules&localIdentName="[path][name]__[local]__[hash:base64:5]"!sass!./Button.scss';

class Button extends WixComponent {
  static propTypes = {
    theme: oneOf(['fill', 'outline']),
    children: any,
    id: string
  };

  static defaultProps = {
    theme: 'fill',
    disabled: false
  };

  componentDidMount() {
    if (typeof styles.toString === 'function') {
      const style = document.createElement('style');
      style.setAttribute('wix-style', true);
      style.setAttribute('wix-style-react-button', true);
      style.innerText = styles.toString();
      document.head.insertBefore(style, document.head.firstChild);
    }

    super.componentDidMount();
  }

  render() {
    const {children, theme, className} = this.props;
    const {locals} = styles;
    const classes = (classNames([
      [locals['wix-style-react-button']],
      [locals[`wix-style-react-button-${theme}`]]
    ], className)).trim();

    return (
      <button className={classes} {...omit(this.props, 'children', 'theme', 'className')}>
        {children}
      </button>
    );
  }
}

Button.displayName = 'Button';

export default Button;
