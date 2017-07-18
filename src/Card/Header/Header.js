import React from 'react';
import {bool, node} from 'prop-types';
import classNames from 'classnames';
import styles from './Header.scss';
import WixComponent from '../../BaseComponents/WixComponent';

class Header extends WixComponent {

  static propTypes = {
    title: node.isRequired,
    subtitle: node,
    withoutDivider: bool
  };

  static defaultProps = {
    subtitle: null,
    withoutDivider: false
  };

  render() {
    const {title, subtitle, withoutDivider} = this.props;

    const headerClasses = classNames({
      [styles.header]: true,
      [styles.withDivider]: !withoutDivider,
    });

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

    return (
      <div className={headerClasses}>
        {titleElement}
        {subtitleElement}
      </div>
    );
  }
}

export default Header;
