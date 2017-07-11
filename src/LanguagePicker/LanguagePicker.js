import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import {Languages} from '../Icons/dist';
import ButtonWithOptions from '../ButtonWithOptions/ButtonWithOptions';

export default class LanguagePicker extends WixComponent {
  createDividedChildren() {
    const dividerChild = React.cloneElement(
      this.props.children[0], {
        children: '-',
        languageKey: '-'
      });

    const dividedChildren = [...this.props.children];
    dividedChildren.forEach((_, index) => dividedChildren.splice((index * 2) + 1, 0, dividerChild));
    dividedChildren.pop();

    return dividedChildren;
  }

  createButtonWithOptionsOptions() {
    const dividedChildren = this.createDividedChildren();

    return dividedChildren.map(languagePickerOption => {
      const {languageKey} = languagePickerOption.props;
      const languageName = languagePickerOption.props.children;

      return (
        <ButtonWithOptions.Option key={languageKey} id={languageKey}>
          {languageName}
        </ButtonWithOptions.Option>
      );
    });
  }

  render() {
    const {dataHook, theme, onSelect, dropdownWidth, dropdownOffsetLeft} = this.props;
    return (
      <ButtonWithOptions
        dataHook={dataHook}
        onSelect={option => onSelect(option.id)}
        dropdownWidth={dropdownWidth}
        dropdownOffsetLeft={dropdownOffsetLeft}
        >
        <ButtonWithOptions.Button type="button" height="medium" theme={theme}>
          <Languages size="30px"/>
        </ButtonWithOptions.Button>
        {this.createButtonWithOptionsOptions()}
      </ButtonWithOptions>
    );
  }
}

LanguagePicker.defaultProps = {
  theme: 'icon-greybackground',
  onSelect: () => {},
  dropdownWidth: '100px',
  dropdownOffsetLeft: '-30px'
};

LanguagePicker.propTypes = {
  dataHook: PropTypes.string,
  onSelect: PropTypes.func,
  theme: PropTypes.string,
  children: PropTypes.arrayOf((propValue, key) => {
    if (propValue[key].type !== LanguagePicker.Option) {
      return new Error(`LanguagePicker: Invalid Prop children was given. Validation failed on child number ${key}`);
    }
  }),
  dropdownWidth: PropTypes.string,
  dropdownOffsetLeft: PropTypes.string,
};

LanguagePicker.Option = () => null;

LanguagePicker.Option.propTypes = {
  languageKey: PropTypes.string.isRequired,
  children: PropTypes.string
};
