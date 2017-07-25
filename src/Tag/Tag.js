import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tag.scss';
import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import Typography from '../Typography';
import {SmallX} from '../Icons/dist';

class Tag extends WixComponent {
  render() {
    const {id, children, thumb, removable, onRemove, size, wrap, disabled} = this.props;

    const className = classNames({
      [styles.tag]: true,
      [styles.large]: size === 'large',
      [styles.tagWrap]: wrap,
      [styles.disabled]: disabled
    });

    const innerClassName = classNames({
      [styles.innerTagWrap]: wrap,
      [Typography.t4]: true
    });

    const title = wrap ? children : '';

    return (
      <span className={className} disabled={disabled} id={id} title={title}>
        {thumb && <span className={styles.thumb}>{thumb}</span>}
        <span className={innerClassName}>{children}</span>
        {removable && !disabled && <a className={styles.tagRemoveButton} onClick={() => onRemove(id)}><SmallX/></a>}
      </span>
    );
  }
}

Tag.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  thumb: PropTypes.element,
  onRemove: PropTypes.func,
  removable: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large']),
  wrap: PropTypes.bool,
  disabled: PropTypes.bool
};

Tag.defaultProps = {
  onRemove: () => {},
  size: 'small',
  removable: true,
};

export default Tag;
