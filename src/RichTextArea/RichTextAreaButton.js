import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from '../Tooltip';
import {Bold, Italic, Underline, UnorderedList, OrderedList, Link, Image} from '../Icons/dist';
import styles from './RichTextAreaButton.scss';

const buttons = {
  bold: {
    icon: Bold,
    tooltipText: 'Bold',
    size: 30
  },
  italic: {
    icon: Italic,
    tooltipText: 'Italic',
    size: 30
  },
  underline: {
    icon: Underline,
    tooltipText: 'Underline',
    size: 30
  },
  'unordered-list': {
    icon: UnorderedList,
    tooltipText: 'Bulletted list',
    size: 30
  },
  'ordered-list': {
    icon: OrderedList,
    tooltipText: 'Numbered list',
    size: 30
  },
  link: {
    icon: Link,
    tooltipText: 'Link',
    size: 30
  },
  image: {
    icon: Image,
    tooltipText: 'Image',
    size: 30
  }
};

class RichTextAreaButton extends Component {
  handleMouseDown = event => {
    event.preventDefault();
    if (!this.props.disabled) {
      this.props.onClick();
    }
  };

  render() {
    const {type, isActive, isTooltipDisabled, disabled} = this.props;
    const tooltipContent = <p className={styles.tooltipContent}>{buttons[type].tooltipText}</p>;
    const className = classNames(styles.button, {
      [styles.isActive]: isActive,
      [styles.disabled]: disabled
    });
    return (
      <Tooltip
        appendToParent
        content={tooltipContent}
        overlay=""
        theme="dark"
        alignment="center"
        moveBy={{x: 2, y: 2}}
        hideDelay={0}
        disabled={isTooltipDisabled}
        >
        <button
          className={className}
          onMouseDown={this.handleMouseDown}
          data-hook={`rich-text-area-button-${type}`}
          >
          <span className={styles.wrapper}>
            {this.renderIcon()}
          </span>
        </button>
      </Tooltip>
    );
  }

  renderIcon() {
    const {icon: Icon, size} = buttons[this.props.type];
    return <Icon size={`${size}px`}/>;
  }
}

RichTextAreaButton.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isTooltipDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default RichTextAreaButton;
