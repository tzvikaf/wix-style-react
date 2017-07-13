import React, {Component} from 'react';
import tpaStyleInjector from '../TpaStyleInjector';
import {string, any} from 'prop-types';
import WixBadge from '../../Badge';


let styles = {locals: {}};
try {
  styles = require(`!css-loader?modules&camelCase&localIdentName="[path][name]__[local]__[hash:base64:5]"!sass-loader!./Badge.scss`);
} catch (e) {
}


class Badge extends Component {
  static propTypes = {
    primaryClassName: string,
    alignmentTopClassName: string,
    injectedStyles: string,
    children: any
  };
  extendStyles() {
    const {primaryClassName = '', alignmentTopClassName = '', injectedStyles} = this.props;
    injectedStyles.primary = primaryClassName || injectedStyles.primary;
    injectedStyles.top = alignmentTopClassName || injectedStyles.top;
    return injectedStyles;
  }

  render() {
    return (<WixBadge {...this.props} styles={this.extendStyles()}>{this.props.children}</WixBadge>);
  }
}

Badge.displayName = 'Badge';

export default tpaStyleInjector(Badge, styles);
