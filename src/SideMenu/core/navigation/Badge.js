import React from 'react';
import styles from './styles.scss';
import {bool} from 'prop-types';
import classnames from 'classnames';

class Badge extends React.Component {
  render() {
    const {inline, ...rest} = this.props;

    const className = classnames({
      [styles.linkBadge]: true,
      [styles.inlineLinkBadge]: inline,
      [styles.fixedLinkBadge]: !inline
    });

    return <span className={className} data-hook="menu-navigation-badge" {...rest}/>;
  }
}

Badge.defaultProps = {
  inline: false
};

Badge.propTypes = {
  inline: bool
};

export default Badge;
