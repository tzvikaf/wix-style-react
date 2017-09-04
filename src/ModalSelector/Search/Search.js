import React from 'react';
import PropTypes from 'prop-types';
import styles from './Search.scss';
import WixComponent from '../../BaseComponents/WixComponent';
import Input from '../../Input/Input';

class Search extends WixComponent {
  static propTypes = {
    // isOpen: PropTypes.bool.isRequired,
    // onRequestClose: PropTypes.func,
    // onOk: PropTypes.func,
    // onCancel: PropTypes.func
  }

  static defaultProps = {
  }

  render() {
    // const {} = this.props;

    return (
      <Input
        className={styles.input}
        id="search-input"
        maxLength={524288}
        placeholder="Search..."
        size="normal"
        textOverflow="clip"
        theme="normal"
        width="initial"
        magnifyingGlass
        roundInput
        />
    );
  }
}

export default Search;