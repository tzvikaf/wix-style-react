import React from 'react';
// import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import Input from '../../Input';
import styles from './Search.scss';
import Finder from '../../Icons/dist/components/Finder';

class Search extends WixComponent {
  static propTypes = {
  };

  static defaultProps = {
  };

  render() {

    return (
      <Input
        id="search-input"
        placeholder="Search..."
        prefix={
          <div className={styles.search}>
            <Finder/>
          </div>
        }
        roundInput
        />
    );
  }
}

export default Search;
