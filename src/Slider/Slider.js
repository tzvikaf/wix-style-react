import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Range} from 'rc-slider';
import uniqueId from 'lodash/uniqueId';
import SliderHandle from './SliderHandle';
import classNames from 'classnames';
import './Slider.scss';

export default class Slider extends Component {
  getRange() {
    const {min, max, step} = this.props;
    const range = [];

    for (let i = min; i <= max; i += step) {
      range.push(i);
    }

    return range;
  }

  renderLabel(value) {
    const {min, max} = this.props;

    return (
      <div className="mark">
        <div className="mark-line"/>
        <div className="mark-value">
          {(value === min || value === max) && (
            <div>{value}</div>
          )}
        </div>
      </div>
    );
  }

  getMarks() {
    return this.getRange().reduce((acc, cur) => {
      acc[cur] = {
        label: this.renderLabel(cur)
      };

      return acc;
    }, {});
  }

  render() {
    const marks = this.props.displayMarks ? this.getMarks() : {};
    const {dataHook} = this.props;
    return (
      <div className={classNames('wix-slider', {rtl: this.props.rtl})} id={this.props.id} data-hook={dataHook}>
        <Range
          handle={props => (<SliderHandle key={props.index} displayTooltip={this.props.displayTooltip} {...props}/>)}
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          marks={marks}
          step={this.props.step}
          onChange={this.props.onChange}
          onAfterChange={this.props.onAfterChange}
          allowCross={this.props.allowCross}
          />
      </div>
    );
  }
}

Slider.propTypes = {
  id: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.number),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onAfterChange: PropTypes.func,
  allowCross: PropTypes.bool,
  displayTooltip: PropTypes.bool,
  displayMarks: PropTypes.bool,
  rtl: PropTypes.bool,
  dataHook: PropTypes.string
};

Slider.defaultProps = {
  min: 1,
  max: 20,
  step: 1,
  value: [2, 7],
  allowCross: true,
  id: uniqueId(),
  displayTooltip: true,
  displayMarks: true,
  rtl: false
};
