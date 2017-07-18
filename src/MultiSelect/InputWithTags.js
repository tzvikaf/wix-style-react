import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../Tag/Tag';
import Input from '../Input';
import styles from './InputWithTags.scss';
import omit from 'lodash/omit';
import classNames from 'classnames';

class InputWithTags extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);

    this.state = {inputValue: ''};
  }

  componentDidMount() {
    this.props.autoFocus && this.props.onFocus();
  }

  render() {
    const {tags, onRemoveTag, placeholder, error, disabled, ...inputProps} = this.props;

    const className = classNames({
      [styles.tagsContainer]: true,
      [styles.disabled]: disabled,
      [styles.error]: error,
    });

    const desiredProps = omit(inputProps, ['onManuallyInput', 'inputElement', 'closeOnSelect', 'predicate', 'menuArrow', 'onClickOutside', 'fixedHeader', 'fixedFooter', 'dataHook']);
    const fontSize = (desiredProps.size && desiredProps.size === 'small') ? '14px' : '16px';
    return (
      <div className={className} onClick={() => this.input.focus()}>

        {tags.map(({label, ...rest}) => <Tag key={rest.id} disabled={disabled} onRemove={onRemoveTag} {...rest}>{label}</Tag>)}
        <span className={styles.input} data-hook="inner-input-with-tags">
          <div className={styles.hiddenDiv} style={{fontSize}}>
            {this.state.inputValue}
          </div>

          <Input
            ref={input => this.input = input}
            placeholder={tags.length === 0 ? placeholder : ''}
            {...desiredProps}
            disabled={disabled}
            onChange={e => {
              this.setState({inputValue: e.target.value});
              desiredProps.onChange && desiredProps.onChange(e);
            }}
            />
        </span>
      </div>
    );
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

InputWithTags.propTypes = {
  onRemoveTag: PropTypes.func,
  tags: PropTypes.array,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool
};

InputWithTags.defaultProps = {
  onRemoveTag: () => {},
  tags: [],
  placeholder: ''
};

export default InputWithTags;
