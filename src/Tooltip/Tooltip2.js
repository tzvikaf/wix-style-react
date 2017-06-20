import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Tooltip2.scss';
import Popper from 'popper.js';
import classNames from 'classnames';

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
    moveArrowTo: PropTypes.number
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
    const {moveBy} = this.props;
    const target = this.refs.target.children[0];
    const content = this.refs.content.children[0];

    this.popper = new Popper(target, content, {
      placement,
      modifiersIgnored: ['applyStyle']
    });

    this.popper.onUpdate(this.handlePopperUpdate);
  }

  componentWillUnmount() {
    this.popper.destroy();
  }

  componentWillReceiveProps(nextProps) {
    this.handleNextActive(nextProps);
    this.handleNextMoveBy(nextProps);
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
    return placement.replace(/\-.*/, '');
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
      top: this.props.moveBy.x,
      left: this.props.moveBy.y
    };
  }

  render() {
    const {arrowStyle, theme, bounce, disabled, maxWidth, zIndex, textAlign} = this.props;
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

    const popperTooltipStyle = {
      position: 'absolute',
      transform: 'translate3d()'
    };

    const popperStyle = this.getPopperStyle();

    return (
      <div className={styles.root}>
        <div ref='target'>
          {clonedTarget}
        </div>
        <div ref='content'>
          <div className={classNames(styles.tooltip, {
            [styles.active]: active,
          })}
          style={{maxWidth, zIndex, textAlign, ...popperStyle}}
          data-hook='tooltip'
        >
          <div className={classNames({
            [styles[`bounce-on-${arrowPlacement}`]]: bounce
          })}>
            <div className={classNames(styles.tooltipInner, styles[theme], styles[placement], {
              [styles.active]: active,
            })}>
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
