import React from 'react';
import {bool, node, any, oneOf} from 'prop-types';
import classNames from 'classnames';
import styles from './CollapsedHeader.scss';
import Switch from '../../../src/ToggleSwitch';
import WixComponent from '../../../src/BaseComponents/WixComponent';
import Collapse from 'react-collapse';
import Button from '../../../src/Button';
import ArrowDownThin from '../../../src/Icons/dist/components/ArrowDownThin';
import ArrowUpThin from '../../../src/Icons/dist/components/ArrowUpThin';

class CollapsedHeader extends WixComponent {

  static propTypes = {
    title: node.isRequired,
    subtitle: node,
    withoutDivider: bool,
    children: any,
    toggleStyle: oneOf(['switch', 'button']),
    collapsed: bool
  };

  static defaultProps = {
    subtitle: null,
    collapsed: false,
    toggleStyle: 'switch',
    withoutDivider: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: props.collapsed
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collapsed && nextProps.collapsed !== this.state.isCollapsed) {
      this.setState({isCollapsed: nextProps.collapsed});
    }
  }

  render() {
    const {title, subtitle, withoutDivider} = this.props;

    const headerClasses = classNames({
      [styles.headerOnlyTitle]: !subtitle,
      [styles.headerTitleSubtitle]: subtitle,
      [styles.withDivider]: !withoutDivider,
    });

    const onChange = () => {
      this.setState({isCollapsed: !this.state.isCollapsed});
    };

    const switchElement = (
      <div className={styles.collapsedSwitch}>
        <Switch dataHook="switch" onChange={onChange} checked={!this.state.isCollapsed}/>
      </div>
    );

    const buttonElement = (
      <div className={styles.button}>
        <Button
          dataHook="button"
          height="medium"
          prefixIcon={this.state.isCollapsed ? <ArrowDownThin/> : <ArrowUpThin/>}
          onClick={onChange}
          theme="whiteblueprimary"
          >
          {this.state.isCollapsed ? 'More' : 'Less'}
        </Button>
      </div>
    );

    const titleElement = (
      <div data-hook="title" className={styles.title}>
        {title}
      </div>
    );

    const subtitleElement = subtitle ? (
      <div data-hook="subtitle" className={styles.subtitle}>
        {this.props.subtitle}
      </div>
    ) : null;

    const toggleElement = this.props.toggleStyle === 'switch' ? switchElement : buttonElement;

    return (
      <div>
        <div className={headerClasses}>
          <div>
            {titleElement}
            {subtitleElement}
          </div>
          {toggleElement}
        </div>
        <Collapse isOpened={!this.state.isCollapsed}>
          {this.props.children}
        </Collapse>
      </div>
    );
  }
}

export default CollapsedHeader;
