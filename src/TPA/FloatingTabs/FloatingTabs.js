import React from 'react';
import {any} from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import Button from '../Button/Button';
import tpaStyleInjector from '../TpaStyleInjector';

let styles = {locals: {}};
try {
  styles = require('!css-loader?modules&camelCase&localIdentName="[path][name]__[local]__[hash:base64:5]"!sass-loader!./FloatingTabs.scss');
} catch (e) { }

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

  getActiveId(activeId, items) {
    return activeId || items[0].props.id;
  }

  handleTabClick(id) {
    this.props.onChange(id);
  }

  renderButtons() {
    const {children, activeId} = this.props;
    const tabButtons = React.Children.map(children, child => {
      const _activeId = this.getActiveId(activeId, children);
      const theme = (_activeId === child.props.id) ? 'fill' : 'outline';
      return (
        <Button
          onClick={() => this.handleTabClick(child.props.id)}
          className={styles.locals['wix-style-react-floating-tabs-buttons-item']}
          dataHook={`floating-tab-item-button-${child.props.id}`}
          theme={theme}
          >
          {child.props.title}
        </Button>
      );
    });
    return <div className={styles.locals['wix-style-react-floating-tabs-buttons']} data-hook="floating-tab-item-buttons">{tabButtons}</div>;
  }

  renderContent() {
    const {children, activeId} = this.props;
    return React.Children.map(children, child => {
      const _activeId = this.getActiveId(activeId, children);
      const className = child.props.id === _activeId ? 'active' : '';
      return <div className={className}>{child}</div>;
    });
  }

  render() {
    return (
      <div className={styles.locals['wix-style-react-floating-tabs']}>
        {this.renderButtons()}
        {this.renderContent()}
      </div>
    );
  }
}

FloatingTabs.displayName = 'FloatingTabs';

export default tpaStyleInjector(FloatingTabs, styles);
