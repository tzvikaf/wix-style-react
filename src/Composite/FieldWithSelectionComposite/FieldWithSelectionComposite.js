import React, {Children} from 'react';
import {any} from 'prop-types';
import WixComponent from '../../../src/BaseComponents/WixComponent';
import styles from './FieldWithSelectionComposite.scss';
import classNames from 'classnames';
import FieldLabelAttributes from '../../FieldLabelAttributes/FieldLabelAttributes';

class FieldWithSelectionComposite extends WixComponent {
  constructor(props) {
    super(props);
    this._onTextInputFocus = this._onTextInputFocus.bind(this);
    this._onTextInputBlur = this._onTextInputBlur.bind(this);

    this.state = {
      textInputFocused: false,
    };
  }

  _onTextInputFocus() {
    this.setState({textInputFocused: true});
  }

  _onTextInputBlur() {
    this.setState({textInputFocused: false});
  }

  render() {
    const children = Children.toArray(this.props.children);
    const label = children.length === 3 ? (
      <div className={styles.label}>
        {children[0]}
        { this.props.required || this.props.info ? <FieldLabelAttributes required={this.props.required} info={this.props.info}/> : null }
      </div>) : null;
    const textInput = label ? children[1] : children[0];
    const selectionInput = label ? children[2] : children[1];
    const selectionInputType = selectionInput.type.name;
    const inputsWrapperClassNames = {[styles.inputs]: true};
    if (selectionInputType) {
      inputsWrapperClassNames[styles[selectionInputType.toLowerCase()]] = true;
    }

    inputsWrapperClassNames[styles.focused] = this.state.textInputFocused;
    inputsWrapperClassNames[styles.error] = this.props.error;
    inputsWrapperClassNames[styles.disabled] = this.props.disabled;

    return (
      <div className={styles.wrapper} >
        {label}
        <div className={classNames(inputsWrapperClassNames)}>
          {React.cloneElement(textInput, {onFocus: this._onTextInputFocus, onBlur: this._onTextInputBlur, error: this.props.error, disabled: this.props.disabled, withSelection: true})}
          {React.cloneElement(selectionInput, {noBorder: true, noRightBorderRadius: true, disabled: this.props.disabled})}
        </div>
      </div>
    );
  }
}

FieldWithSelectionComposite.propTypes = {
  children: any
};

FieldWithSelectionComposite.displayName = 'FieldWithSelectionComposite';

export default FieldWithSelectionComposite;
