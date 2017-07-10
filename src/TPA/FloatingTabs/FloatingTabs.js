import React from 'react';
import {any} from 'prop-types';
import classNames from 'classnames';
import WixComponent from '../../BaseComponents/WixComponent';
import FloatingTabItem from '../FloatingTabItem/FloatingTabItem';
import tpaStyleInjector from '../TpaStyleInjector';

let styles = {locals: {}};
try {
  styles = require('!css-loader?modules&camelCase&localIdentName="[path][name]__[local]__[hash:base64:5]"!sass-loader!./FloatingTabs.scss');
} catch (e) {}

class FloatingTabs extends WixComponent {
  static propTypes = {
    children: any
  };

  static defaultProps = {
    //
  };

  constructor() {
    super();
    this.state = {
      selectedTabIndex: null
    };
  }

  render() {
    const {children, className} = this.props;
    const {locals} = styles;
    const classes = (classNames([
      [locals['wix-style-react-floating-tabs']]
    ], className)).trim();

    const tabItems = React.Children.map(children, (child, index) => {
      const {onClick, active, ...passThroughProps} = child.props;
      const wrapperOnClick = index => {
        this.setSelectedTab(index);
        onClick();
      };
      const isActive = this.state.selectedTabIndex ? this.state.selectedTabIndex === index : active;
      return <FloatingTabItem onClick={() => wrapperOnClick(index)} {...passThroughProps} active={isActive} key={index}/>;
    });

    return (
      <div className={classes}>
        {tabItems}
      </div>
    );
  }

  setSelectedTab(index) {
    this.setState({selectedTabIndex: index});
  }
}

FloatingTabs.displayName = 'FloatingTabs';

export default tpaStyleInjector(FloatingTabs, styles);
