import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Ticker from './Ticker';
import Unit from './Unit';
import Group from './Group';
import InputSuffix, {getVisibleSuffixCount} from './InputSuffix';

import styles from './Input.scss';

class Input extends Component {
  static Ticker = Ticker;
  static Unit = Unit;
  static Group = Group;

  state = {
    focus: false
  };

  componentDidMount() {
    this.props.autoFocus && this._onFocus();
  }

  render(props = {}) {
    const {
      id,
      name,
      value,
      placeholder,
      help,
      helpMessage,
      unit,
      magnifyingGlass,
      menuArrow,
      defaultValue,
      tabIndex,
      onClear,
      autoFocus,
      onKeyUp,
      onPaste,
      readOnly,
      prefix,
      suffix,
      type,
      errorMessage,
      maxLength,
      textOverflow,
      theme,
      disabled,
      error,
      width,
      tooltipPlacement,
      onTooltipShow,
      autocomplete
    } = this.props;

    const onIconClicked = () => {
      if (!disabled) {
        this._onFocus();
      }
    };

    const isClearButtonVisible = onClear && !error && !disabled && !!value;

    const visibleSuffixCount = getVisibleSuffixCount({
      error, disabled, help, magnifyingGlass, isClearButtonVisible, menuArrow, unit, suffix
    });

    const inputClassNames = classNames(styles.input, {
      [styles.withPrefix]: !!prefix,
      [styles.withSuffix]: visibleSuffixCount,
      [styles.withSuffixes]: visibleSuffixCount > 1
    });

    const ariaAttribute = {};
    Object.keys(this.props).filter(key => key.startsWith('aria')).map(key => ariaAttribute['aria-' + key.substr(4).toLowerCase()] = this.props[key]);

    const inputElement = (
      <input
        style={{textOverflow, width}}
        ref={input => this.input = input}
        className={inputClassNames}
        id={id}
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
        value={value}
        onChange={this._onChange}
        maxLength={maxLength}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        onKeyDown={this._onKeyDown}
        onDoubleClick={this._onDoubleClick}
        onPaste={onPaste}
        placeholder={placeholder}
        tabIndex={tabIndex}
        autoFocus={autoFocus}
        onClick={this._onClick}
        onKeyUp={onKeyUp}
        readOnly={readOnly}
        type={type}
        autoComplete={autocomplete}
        {...ariaAttribute}
        {...props}
        />);

    return (<div className={styles.inputWrapper}>
      {prefix && <div className={styles.prefix}>{prefix}</div>}

      { inputElement }
      { visibleSuffixCount > 0 && <InputSuffix
        error={error}
        errorMessage={errorMessage}
        theme={theme}
        disabled={disabled}
        help={help}
        helpMessage={helpMessage}
        onIconClicked={onIconClicked}
        magnifyingGlass={magnifyingGlass}
        isClearButtonVisible={isClearButtonVisible}
        onClear={onClear}
        menuArrow={menuArrow}
        unit={unit}
        focused={this.state.focus}
        suffix={suffix}
        tooltipPlacement={tooltipPlacement}
        onTooltipShow={onTooltipShow}
        /> }
    </div>);
  }

  focus = () => {
    this._onFocus();
    this.input && this.input.focus();
  };

  blur = () => {
    this._onBlur();
    this.input && this.input.blur();
  };

  select = () => {
    this.input && this.input.select();
  };

  _onFocus = () => {
    this.setState({focus: true});
    this.props.onFocus && this.props.onFocus();

    if (this.props.autoSelect) {
      // Set timeout is needed here since onFocus is called before react
      // gets the reference for the input (specifically when autoFocus
      // is on. So setTimeout ensures we have the ref.input needed in select)
      setTimeout(() => this.select(), 0);
    }
  };

  _onBlur = e => {
    this.setState({focus: false});
    this.props.onBlur && this.props.onBlur(e);
  };

  _onClick = e => {
    this.props.onInputClicked && this.props.onInputClicked(e);
  };

  _onKeyDown = e => {
    this.props.onKeyDown && this.props.onKeyDown(e);

    if (e.keyCode === 13 /* enter */) {
      this.props.onEnterPressed && this.props.onEnterPressed(e);
    } else if (e.keyCode === 27 /* esc */) {
      this.props.onEscapePressed && this.props.onEscapePressed(e);
    }
  };

  _onChange = e => {
    if (this.props.type === 'number' && !(/^[\d.,\-+]*$/.test(e.target.value))) {
      return;
    }

    this.props.onChange && this.props.onChange(e);
  }
}

Input.displayName = 'Input';

Input.defaultProps = {
  size: 'normal',
  theme: 'normal',
  errorMessage: '',
  helpMessage: '',
  roundInput: false,
  textOverflow: 'clip',
  maxLength: 524288,
  width: 'initial',
  withSelection: false
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  theme: PropTypes.oneOf(['normal', 'paneltitle', 'material', 'amaterial', 'flat', 'flatdark']),
  forceHover: PropTypes.bool,
  forceFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  unit: PropTypes.string,
  defaultValue: PropTypes.string,
  tabIndex: PropTypes.number,
  magnifyingGlass: PropTypes.bool,
  menuArrow: PropTypes.bool,
  rtl: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoSelect: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onInputClicked: PropTypes.func,
  onEscapePressed: PropTypes.func,
  onEnterPressed: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onPaste: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  dataHook: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  type: PropTypes.node,
  maxLength: PropTypes.number,
  errorMessage: PropTypes.node,
  roundInput: PropTypes.bool,
  noLeftBorderRadius: PropTypes.string,
  noRightBorderRadius: PropTypes.string,
  help: PropTypes.bool,
  textOverflow: PropTypes.string,
  helpMessage: PropTypes.node,
  title: PropTypes.string,
  width: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaDescribedby: PropTypes.string,
  ariaControls: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  onTooltipShow: PropTypes.func,
  withSelection: PropTypes.bool,
  autocomplete: PropTypes.oneOf(['off', 'on']),
};

export default Input;
