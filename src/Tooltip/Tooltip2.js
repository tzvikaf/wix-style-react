import _ from 'lodash';
import React, {Component} from 'react';
import styles from './Tooltip2.scss';
import Popper from 'popper.js';
import classNames from 'classnames';

export default class Tooltip2 extends Component {
  static propTypes = {
    content: React.PropTypes.any.isRequired,
    children: React.PropTypes.any.isRequired,
    placement: React.PropTypes.string,
    alignment: React.PropTypes.string,
    arrowPlacement: React.PropTypes.string,
    arrowStyle: React.PropTypes.object,
    theme: React.PropTypes.string,
    showDelay: React.PropTypes.number,
    hideDelay: React.PropTypes.number
  };

  static defaultProps = {
    placement: 'top',
    theme: 'light',
    showDelay: 200,
    hideDelay: 500
  };

  constructor(props) {
    super(props);

    this.placementFlipMap = {top: 'bottom', left: 'right', right: 'left', bottom: 'top'};
    this.alignmentMap = {top: 'start', right: 'end', bottom: 'end', left: 'start', center: ''}

    this.state = {
      placement: this.getPopperPlacement(props.placement, props.alignment)
    };

    this.handlePopperUpdate = this.handlePopperUpdate.bind(this);
  }

  handlePopperUpdate(data) {
    const hasChangedPlacement = data.placement !== this.state.placement;

    if (hasChangedPlacement) {
      this.setState({ placement: data.placement });
    }
  }

  getPopperPlacement(placement, alignment) {
    const popperAlignment = this.alignmentMap[alignment];

    if (alignment) {
      return `${placement}-${popperAlignment}`;
    }

    return placement;
  }

  componentDidMount() {
    const {placement} = this.state;
    const target = this.refs.target.children[0];
    const content = this.refs.content.children[0];

    new Popper(target, content, {placement, onUpdate: this.handlePopperUpdate});
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

    return (
      <div className={styles.root}>
        <div ref='target'>
          {this.props.children}
        </div>
        <div ref='content'>
          <div className={classNames(styles.tooltip, styles[theme], styles[placement])}>
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
    );
  }
}
