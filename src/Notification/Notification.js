import React, {Children} from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import classNames from 'classnames';
import css from './Notification.scss';
import WixComponent from '../BaseComponents/WixComponent';
import {children, once, optional, any} from '../../src/Composite';
import CloseButton from './CloseButton';
import TextLabel from './TextLabel';
import ActionButton from './ActionButton';

export const LOCAL_NOTIFICATION = 'local';
export const GLOBAL_NOTIFICATION = 'global';
export const STICKY_NOTIFICATION = 'sticky';
export const DEFAULT_TIMEOUT = 6000;

export const notificationTypeToPosition = {
  [LOCAL_NOTIFICATION]: 'absolute',
  [GLOBAL_NOTIFICATION]: 'relative',
  [STICKY_NOTIFICATION]: 'fixed'
};

const animationsTimeouts = {
  enter: 500,
  leave: 350
};

function FirstChild(props) {
  const childrenArray = Children.toArray(props.children);
  return childrenArray[0] || null;
}

function mapChildren(children) {
  const childrenArray = Children.toArray(children);

  if (childrenArray.length === 3) {
    return {
      label: childrenArray[0],
      ctaButton: childrenArray[1],
      closeButton: childrenArray[2]
    };
  } else {
    return {
      label: childrenArray[0],
      closeButton: childrenArray[1]
    };
  }
}

class Notification extends WixComponent {
  closeTimeout;

  constructor(props) {
    super(props);
    this.state = {
      hideByCloseClick: false,
      hideByTimer: false
    };

    this.startCloseTimer(props);
  }

  startCloseTimer({type, timeout}) {
    if (type !== GLOBAL_NOTIFICATION) {
      this.closeTimeout = setTimeout(() => {
        this.hideNotificationOnTimeout();
      }, timeout || DEFAULT_TIMEOUT);
    }
  }

  clearCloseTimeout() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  hideNotificationOnCloseClick() {
    this.setState({hideByCloseClick: true});
    setTimeout(() => {
      this.props.onClose && this.props.onClose('hide-by-close-click');
    }, animationsTimeouts.leave + 100);
  }

  hideNotificationOnTimeout() {
    this.setState({hideByTimer: true});
    setTimeout(() => {
      this.props.onClose && this.props.onClose('hide-by-timer');
    }, animationsTimeouts.leave + 100);
  }

  bypassCloseFlags() {
    this.setState({
      hideByCloseClick: false,
      hideByTimer: false
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.bypassCloseFlags();
      this.clearCloseTimeout();
      this.startCloseTimer(nextProps);
    }
  }

  componentWillUnmount() {
    this.clearCloseTimeout();
  }

  shouldShowNotification() {
    return this.props.show && !this.state.hideByCloseClick && !this.state.hideByTimer;
  }

  getWrapperClassNames() {
    const {
      type,
      theme,
      size,
    } = this.props;

    const position = notificationTypeToPosition[type];

    return classNames({
      [css.notificationWrapper]: true,
      [css[`${theme}Theme`]]: true,
      [css[`${size}Size`]]: true,
      [css[`${position}Position`]]: true
    });
  }

  renderLabel(component) {
    return (
      <div key="label" className={css.labelWrapper}>
        {component}
      </div>
    );
  }

  renderActionButton(component) {
    return (
      component ?
        <div key="cta" className={css.ctaButtonWrapper}>
          {component}
        </div> :
        null
    );
  }

  renderCloseButton(component) {
    return (
      <div
        data-hook="notification-close-button"
        key="close"
        className={css.closeButtonWrapper}
        onClick={() => this.hideNotificationOnCloseClick()}
        >
        {component}
      </div>
    );
  }

  renderNotification() {
    const {
      zIndex,
      children
    } = this.props;

    const childrenComponents = mapChildren(children);

    return (
      <div
        data-hook="notification-wrapper"
        className={this.getWrapperClassNames()}
        style={{zIndex}}
        >
        <div className={css.contentWrapper}>
          {this.renderLabel(childrenComponents.label)}
          {this.renderActionButton(childrenComponents.ctaButton)}
        </div>
        {this.renderCloseButton(childrenComponents.closeButton)}
      </div>
    );
  }

  render() {
    return (
      <div className={css.notificationComponent}>
        <FirstChild>
          <TransitionGroup>
            {this.shouldShowNotification() && [this.renderNotification()].map((item, index) =>
              <CSSTransition
                key={index}
                classNames={{
                  enter: css.notificationAnimationEnter,
                  enterActive: css.notificationAnimationEnterActive,
                  exit: css.notificationAnimationLeave,
                  exitActive: css.notificationAnimationLeaveActive,
                }}
                timeout={{enter: animationsTimeouts.enter, exit: animationsTimeouts.leave}}
                >
                {item}
              </CSSTransition>
            )}
          </TransitionGroup>
        </FirstChild>
      </div>
    );
  }
}

Notification.propTypes = {
  show: PropTypes.bool,
  theme: PropTypes.oneOf(['standard', 'error', 'success', 'warning', 'premium']),
  size: PropTypes.oneOf(['small', 'big']),
  type: PropTypes.oneOf([GLOBAL_NOTIFICATION, LOCAL_NOTIFICATION, STICKY_NOTIFICATION]),
  timeout: PropTypes.number,
  zIndex: PropTypes.number,
  onClose: PropTypes.func,
  children: children(once(TextLabel), any(/*ActionButton or CloseButton*/), optional(CloseButton))
};

Notification.defaultProps = {
  theme: 'standard',
  size: 'small',
  type: GLOBAL_NOTIFICATION,
  onClose: null
};

Notification.CloseButton = CloseButton;
Notification.TextLabel = TextLabel;
Notification.ActionButton = ActionButton;

export default Notification;
