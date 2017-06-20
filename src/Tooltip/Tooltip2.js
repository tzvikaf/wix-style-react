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
  };

  static defaultProps = {
    placement: 'top',
    theme: 'light',
    showDelay: 200,
    hideDelay: 500,
    showTrigger: 'mouseenter',
    hideTrigger: 'mouseleave',
    active: false
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

    new Popper(target, content, {placement, onUpdate: this.handlePopperUpdate});
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (nextProps.showTrigger === 'custom' && nextProps.active && !this.props.active) {
      this.toggleActive(true);
    } else if (nextProps.hideTrigger === 'custom' && !nextProps.active && this.props.active) {
      this.toggleActive(false);
    }
  }

  toggleActive(active) {
    this.setState({active});
  }

  handlePopperUpdate(data) {
    const hasChangedPlacement = data.placement !== this.state.placement;

    if (hasChangedPlacement) {
      this.setState({ placement: data.placement });
    }
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

  render() {
    const {arrowStyle, theme} = this.props;
    const placement = this.placementWithoutAlignment(this.state.placement);
    const arrowPlacement = this.getArrowPlacement(placement);

    let {active} = this.state;

    const clonedTarget = React.cloneElement(this.props.children, {
      onMouseEnter: () => this.handleToggleTrigger('mouseenter'),
      onMouseLeave: () => this.handleToggleTrigger('mouseleave'),
      onClick: () => this.handleToggleTrigger('click')
    });

    return (
      <div className={styles.root}>
        <div ref='target'>
          {clonedTarget}
        </div>
        <div ref='content'>
          <div className={classNames(styles.tooltip, {
            [styles.active]: active
          })}>
            <div className={classNames(styles.tooltipInner, styles[theme], styles[placement], {
              [styles.active]: active
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
    );
  }
}
