import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Tooltip2.scss';
import Popper from 'popper.js';
import classNames from 'classnames';

const TooltipRefreshRate = 20;

export default class Tooltip2 extends Component {
  static propTypes = {
    content: PropTypes.any.isRequired,
    children: PropTypes.any.isRequired,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    alignment: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
    theme: PropTypes.oneOf(['light', 'dark', 'error']),
    showDelay: PropTypes.number,
    hideDelay: PropTypes.number,
    showTrigger: PropTypes.oneOf(['custom', 'mouseenter', 'mouseleave', 'click', 'focus', 'blur']),
    hideTrigger: PropTypes.oneOf(['custom', 'mouseenter', 'mouseleave', 'click', 'focus', 'blur']),
    active: PropTypes.bool,
    arrowPlacement: PropTypes.string,
    arrowStyle: PropTypes.object,
    moveBy: PropTypes.object,
    disabled: PropTypes.bool,
    maxWidth: PropTypes.string,
    zIndex: PropTypes.number,
    textAlign: PropTypes.string,
    moveArrowTo: PropTypes.number,
    bounce: PropTypes.bool
  };

  static defaultProps = {
    placement: 'top',
    theme: 'light',
    showDelay: 200,
    hideDelay: 500,
    showTrigger: 'mouseenter',
    hideTrigger: 'mouseleave',
    active: false,
    moveBy: {x: 0, y: 0},
    disabled: false,
    maxWidth: '1200px',
    zIndex: 2000,
    textAlign: 'center'
  };

  constructor(props) {
    super(props);

    this.placementFlipMap = {top: 'bottom', left: 'right', right: 'left', bottom: 'top'};
    this.alignmentMap = {top: 'start', right: 'end', bottom: 'end', left: 'start', center: ''};

    this.state = {
      placement: this.getPopperPlacement(props.placement, props.alignment),
      active: props.active
    };

    this.handlePopperUpdate = this.handlePopperUpdate.bind(this);
    this.handleHideTrigger = this.handleHideTrigger.bind(this);
    this.handleShowTrigger = this.handleShowTrigger.bind(this);
  }

  componentDidMount() {
    const {placement} = this.state;
    const target = this.refs.target.children[0];
    const content = this.refs.content.children[0];

    this.popper = new Popper(target, content, {
      placement,
      modifiers: {
        applyStyle: {enabled: false},
      },
      onUpdate: this.handlePopperUpdate,
      onCreate: this.handlePopperUpdate
    });
  }

  componentWillUnmount() {
    this.popper.destroy();
    clearInterval(this.scheduleInterval);
  }

  componentWillReceiveProps(nextProps) {
    this.handleNextActive(nextProps);
    this.handleNextMoveBy(nextProps);
  }

  //Schedule popper updates periodically, only when the tooltip is visible (for
  //tooltip repositioning - e.g. when the target dimensions change).
  componentDidUpdate() {
    if (this.state.active && !this.scheduleInterval) {
      this.scheduleInterval = setInterval(() => {
        this.popper.scheduleUpdate();
      }, TooltipRefreshRate);
    } else if (!this.state.active) {
      clearInterval(this.scheduleInterval);
      this.scheduleInterval = null;
    }
  }

  toggleActive(active) {
    this.setState({active});
  }

  handleNextMoveBy(nextProps) {
    const hasChanged = nextProps.moveBy.x !== this.props.moveBy.x ||
                       nextProps.moveBy.y !== this.props.moveBy.y;

    if (hasChanged) {
      this.moveBy = nextProps.moveBy;
      this.popper.update();
    }
  }

  handleNextActive(nextProps) {
    const {active: nextActive} = nextProps;
    const {active: currentlyActive} = this.props;

    if (nextProps.showTrigger === 'custom' && nextActive && !currentlyActive) {
      this.toggleActive(true);
    } else if (nextProps.hideTrigger === 'custom' && !nextActive && currentlyActive) {
      this.toggleActive(false);
    }
  }

  handlePopperUpdate(data) {
    const hasChangedPlacement = data.placement !== this.state.placement;

    if (hasChangedPlacement) {
      this.setState({
        placement: data.placement,
      });
    }

    this.setState({popperData: data});
  }

  handleToggleTrigger(triggerType) {
    const {active} = this.state;

    if (active) {
      this.handleHideTrigger(triggerType);
    } else {
      this.handleShowTrigger(triggerType);
    }
  }

  handleHideTrigger(triggerType) {
    if (this.props.hideTrigger === triggerType) {
      this.handleToggleWithDelay(false);
    }
  }

  handleShowTrigger(triggerType) {
    if (this.props.showTrigger === triggerType) {
      this.handleToggleWithDelay(true);
    }
  }

  handleToggleWithDelay(toggle) {
    clearTimeout(this.mouseTimeout);

    this.mouseTimeout = setTimeout(() => {
      this.toggleActive(toggle);
    }, toggle ? this.props.showDelay : this.props.hideDelay);
  }

  getPopperPlacement(placement, alignment) {
    const popperAlignment = this.alignmentMap[alignment];

    if (alignment) {
      return `${placement}-${popperAlignment}`;
    }

    return placement;
  }

  getArrowPlacement(popperPlacement) {
    const overrideArrowPlacement = this.props.arrowPlacement;
    return overrideArrowPlacement || this.placementFlipMap[popperPlacement];
  }

  placementWithoutAlignment(placement) {
    return placement.replace(/-.*/, '');
  }

  getPopperStyle() {
    const data = this.state.popperData;

    if (!data) {
      return {};
    }

    const left = Math.round(data.offsets.popper.left);
    const top = Math.round(data.offsets.popper.top);

    const transform = `translate3d(${left}px, ${top}px, 0)`;

    return {
      position: data.offsets.popper.position,
      transform,
      WebkitTransform: transform,
      left: this.props.moveBy.x,
      top: this.props.moveBy.y
    };
  }

  getArrowStyle() {
    const {moveArrowTo, arrowStyle} = this.props;
    const placement = this.placementWithoutAlignment(this.props.placement);
    const isVertical = placement === 'top' || placement === 'bottom';
    const isHorizontal = placement === 'left' || placement === 'right';

    if (moveArrowTo) {
      const repositionStyle = {};

      if (isVertical) {
        if (moveArrowTo > 0) {
          repositionStyle.left = moveArrowTo;
          repositionStyle.right = 'inherit';
        } else {
          repositionStyle.right = -1 * moveArrowTo;
          repositionStyle.left = 'inherit';
        }
      } else if (isHorizontal) {
        if (moveArrowTo > 0) {
          repositionStyle.top = moveArrowTo;
          repositionStyle.bottom = 'inherit';
        } else {
          repositionStyle.bottom = -1 * moveArrowTo;
          repositionStyle.top = 'inherit';
        }
      }

      return {
        ...repositionStyle,
        ...arrowStyle
      };
    }

    return arrowStyle;
  }

  render() {
    const {theme, bounce, disabled, maxWidth, zIndex, textAlign} = this.props;
    const placement = this.placementWithoutAlignment(this.state.placement);
    const arrowPlacement = this.getArrowPlacement(placement);

    let {active} = this.state;

    active = active && !disabled;

    const clonedTarget = React.cloneElement(this.props.children, {
      onMouseEnter: () => this.handleToggleTrigger('mouseenter'),
      onMouseLeave: () => this.handleToggleTrigger('mouseleave'),
      onClick: () => this.handleToggleTrigger('click'),
      onFocus: () => this.handleToggleTrigger('focus'),
      onBlur: () => this.handleToggleTrigger('blur'),
    });

    const popperStyle = this.getPopperStyle();
    const arrowStyle = this.getArrowStyle();

    return (
      <div className={styles.root}>
        <div ref="target">
          {clonedTarget}
        </div>
        <div ref="content">
          <div
            className={classNames(styles.tooltip, {
              [styles.active]: active,
            })}
            style={{zIndex, textAlign, ...popperStyle}}
            data-hook="tooltip"
            >
            <div
              className={classNames({
                [styles[`bounce-on-${arrowPlacement}`]]: bounce
              })}
              >
              <div
                className={classNames(styles.tooltipInner, styles[theme], styles[placement], {
                  [styles.active]: active,
                })}
                style={{maxWidth}}
                >
                <div>
                  {this.props.content}
                </div>
                <div
                  className={classNames(styles.arrow, styles[arrowPlacement])}
                  style={arrowStyle}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
