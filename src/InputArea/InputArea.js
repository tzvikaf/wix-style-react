import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Exclamation from './Exclamation';
import WixComponent from '../BaseComponents/WixComponent';

import styles from './InputArea.scss';

class InputArea extends WixComponent {

  constructor(props) {
    super(props);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);
  }

  state = {
    focus: false,
    counter: (this.props.value || this.props.defaultValue || '').length
  };

  componentDidMount() {
    super.componentDidMount();
    this.props.autoFocus && this._onFocus();
  }

  render() {
    const {
      autoFocus,
      defaultValue,
      error,
      forceFocus,
      forceHover,
      id,
      onKeyUp,
      placeholder,
      readOnly,
      tabIndex,
      rows,
      value,
      minHeight,
      maxHeight,
      maxLength,
      resizable,
      hasCounter,
      theme,
      errorMessage,
      tooltipPlacement,
      onTooltipShow
    } = this.props;

    const inlineStyle = {};

    if (minHeight) {
      inlineStyle.minHeight = minHeight;
    }

    if (maxHeight) {
      inlineStyle.maxHeight = maxHeight;
    }

    const classes = classNames({
      [styles.root]: true,
      [styles[`theme-${theme}`]]: true,
      [styles.hasError]: !!error,
      [styles.hasHover]: forceHover,
      [styles.hasFocus]: forceFocus || this.state.focus,
      [styles.resizable]: !!resizable,
      [styles.hasCounter]: !!hasCounter,
      [styles.nonResizable]: !resizable
    });

    const ariaAttribute = {};
    Object.keys(this.props).filter(key => key.startsWith('aria')).map(key => ariaAttribute['aria-' + key.substr(4).toLowerCase()] = this.props[key]);

    return (
      <div className={styles.wrapper}>
        <div data-hook={this.props.dataHook} className={classes}>
          <textarea
            rows={rows}
            maxLength={maxLength}
            ref={ref => this.textArea = ref}
            className={styles.inputArea}
            id={id}
            style={inlineStyle}
            defaultValue={defaultValue}
            value={value}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            onKeyDown={this._onKeyDown}
            onChange={this._onChange}
            onDoubleClick={this._onDoubleClick}
            placeholder={placeholder}
            tabIndex={tabIndex}
            autoFocus={autoFocus}
            onKeyUp={onKeyUp}
            {...ariaAttribute}
            readOnly={readOnly}
            />
          {theme === 'material' && <div className={styles.bar}/>}
          {hasCounter && maxLength && <span className={styles.counter}>{this.state.counter}/{maxLength}</span>}
        </div>
        <div className={styles.error}>
          {error && <Exclamation errorMessage={errorMessage} tooltipPlacement={tooltipPlacement} onTooltipShow={onTooltipShow}/>}
        </div>
      </div>
    );
  }

  focus() {
    this.textArea && this.textArea.focus();
  }

  blur() {
    this.textArea && this.textArea.blur();
  }

  select() {
    this.textArea && this.textArea.select();
  }

  _onFocus() {
    this.setState({focus: true});
    this.props.onFocus && this.props.onFocus();

    if (this.props.autoSelect) {
      // Set timeout is needed here since onFocus is called before react
      // gets the reference for the input (specifically when autoFocus
      // is on. So setTimeout ensures we have the ref.input needed in select)
      setTimeout(() => this.select(), 0);
    }
  }

  _onBlur(e) {
    this.setState({focus: false});
    this.props.onBlur && this.props.onBlur(e);
  }

  _onKeyDown(e) {
    this.props.onKeyDown && this.props.onKeyDown(e);

    if (e.key === 'Enter') {
      this.props.onEnterPressed && this.props.onEnterPressed();
    } else if (e.key === 'Escape') {
      this.props.onEscapePressed && this.props.onEscapePressed();
    }
  }

  _onChange(e) {
    this.props.hasCounter && this.setState({counter: e.target.value.length});
    this.props.onChange && this.props.onChange(e);
  }
}

InputArea.displayName = 'InputArea';

InputArea.defaultProps = {
  theme: 'normal',
};

InputArea.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.oneOf(['normal', 'paneltitle', 'material', 'amaterial']),
  theme: PropTypes.oneOf(['normal', 'paneltitle', 'material', 'amaterial']),
  forceHover: PropTypes.bool,
  forceFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  defaultValue: PropTypes.string,
  tabIndex: PropTypes.number,
  menuArrow: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoSelect: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onEscapePressed: PropTypes.func,
  onEnterPressed: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  iconLeft: PropTypes.object,
  readOnly: PropTypes.bool,
  rows: PropTypes.number,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  maxLength: PropTypes.number,
  resizable: PropTypes.bool,
  hasCounter: PropTypes.bool,
  errorMessage: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaDescribedby: PropTypes.string,
  ariaControls: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  onTooltipShow: PropTypes.func,
  dataHook: PropTypes.string
};

export default InputArea;
