import React from 'react';
import {any, bool} from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import Button from '../Button/Button';
import tpaStyleInjector from '../TpaStyleInjector';

let styles = {locals: {}};
try {
  styles = require('!css-loader?modules&camelCase&localIdentName="[path][name]__[local]__[hash:base64:5]"!sass-loader!./FloatingTabItem.scss');
} catch (e) {}

class FloatingTabItem extends WixComponent {
  static propTypes = {
    active: bool,
    children: any
  };

  static defaultProps = {
    //
  };

  render() {
    const {active, ...passThroughProps} = this.props;
    const {locals} = styles;
    return (
      <Button
        theme={active ? 'fill' : 'outline'}
        className={locals['wix-style-react-floating-tab-item']}
        {...passThroughProps}
        />
    );
  }
}

FloatingTabItem.displayName = 'FloatingTabItem';

export default tpaStyleInjector(FloatingTabItem, styles);
