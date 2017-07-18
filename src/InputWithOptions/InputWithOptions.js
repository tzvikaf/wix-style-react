import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Input from '../Input';
import omit from 'lodash/omit';
import DropdownLayout from '../DropdownLayout/DropdownLayout';

class InputWithOptions extends WixComponent {

  // Abstraction
  inputClasses() {}
  dropdownClasses() {}
  dropdownAdditionalProps() {}
  inputAdditionalProps() {}

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      showOptions: false,
      lastOptionsShow: 0,
      isEditing: false
    };

    this._onSelect = this._onSelect.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this._onManuallyInput = this._onManuallyInput.bind(this);
    this._renderDropdownLayout = this._renderDropdownLayout.bind(this);
    this._onInputClicked = this._onInputClicked.bind(this);
    this.closeOnSelect = this.closeOnSelect.bind(this);
  }

  onClickOutside() {
    this.hideOptions();
  }

  renderInput() {
    const inputProps = Object.assign(omit(this.props, Object.keys(DropdownLayout.propTypes).concat(['onChange', 'dataHook'])), this.inputAdditionalProps());
    const {inputElement} = inputProps;
    return React.cloneElement(inputElement, {
      menuArrow: true,
      ref: input => this.input = input,
      ...inputProps,
      theme: this.props.theme,
      onChange: this._onChange,
      onInputClicked: this._onInputClicked,
      onFocus: this.showOptions
    });
  }

  _renderDropdownLayout() {
    const dropdownProps = Object.assign(omit(this.props, Object.keys(Input.propTypes).concat(['dataHook'])), this.dropdownAdditionalProps());
    const customStyle = {marginLeft: this.props.dropdownOffsetLeft};
    if (this.props.dropdownWidth) {
      customStyle.width = this.props.dropdownWidth;
    }

    return (
      <div className={this.dropdownClasses()} style={customStyle}>
        <DropdownLayout
          ref={dropdownLayout => this.dropdownLayout = dropdownLayout}
          {...dropdownProps}
          theme={this.props.theme}
          visible={this.state.showOptions}
          onClose={this.hideOptions}
          onSelect={this._onSelect}
          />
      </div>
    );
  }

  render() {
    const {dropDirectionUp} = this.props;
    return (
      <div>
        {dropDirectionUp ? this._renderDropdownLayout() : null}
        <div onKeyDown={this._onKeyDown} onFocus={this._onFocus} className={this.inputClasses()}>
          {this.renderInput()}
        </div>
        {!dropDirectionUp ? this._renderDropdownLayout() : null}
      </div>
    );
  }

  hideOptions() {
    this.setState({showOptions: false});
    this.input.blur();
  }

  showOptions() {
    this.setState({showOptions: true, lastOptionsShow: Date.now()});
  }

  closeOnSelect() {
    return this.props.closeOnSelect;
  }

  _onManuallyInput(inputValue) {
    inputValue = inputValue.trim();
    if (this.closeOnSelect()) {
      this.hideOptions();
    }

    const suggestedOption = this.props.options.find(
      element => element.value === inputValue
    );

    if (this.props.onManuallyInput) {
      this.props.onManuallyInput(inputValue, suggestedOption);
    }
  }

  _onSelect(option, isSelectedOption) {
    this.showOptions();
    const {onSelect} = this.props;

    if (this.closeOnSelect()) {
      this.hideOptions();
    }

    if (isSelectedOption) {
      this.setState({showOptions: false});
    } else if (onSelect) {
      onSelect(option);
    }
  }

  _onChange(event) {
    this.setState({inputValue: event.target.value});

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  _onInputClicked(event) {
    if (this.state.showOptions && (Date.now() - this.state.lastOptionsShow > 2000)) {
      this.hideOptions();
    }

    if (this.props.onInputClicked) {
      this.props.onInputClicked(event);
    }
  }

  _onFocus() {
    this.setState({isEditing: false});
    this.showOptions();
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  _onKeyDown(event) {
    this.setState({isEditing: true});
    if (!this.dropdownLayout._onKeyDown(event)) {
      switch (event.key) {
        case 'Enter':
        case 'Tab': {
          this._onManuallyInput(this.state.inputValue);
          break;
        }
        default:
          this.showOptions();
      }
    }
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  select() {
    this.input.select();
  }
}

InputWithOptions.defaultProps = {
  ...Input.defaultProps,
  ...DropdownLayout.defaultProps,
  onSelect: () => {},
  options: [],
  closeOnSelect: true,
  inputElement: <Input/>,
  valueParser: option => option.value,
  dropdownWidth: null,
  dropdownOffsetLeft: '0'
};

InputWithOptions.propTypes = {
  ...Input.propTypes,
  ...DropdownLayout.propTypes,
  inputElement: PropTypes.element,
  closeOnSelect: PropTypes.bool,
  onManuallyInput: PropTypes.func,
  valueParser: PropTypes.func,
  dropdownWidth: PropTypes.string,
  dropdownOffsetLeft: PropTypes.string
};

InputWithOptions.displayName = 'InputWithOptions';

export default InputWithOptions;
