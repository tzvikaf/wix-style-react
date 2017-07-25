import React from 'react';
import PropTypes from 'prop-types';
import styles from './FilePicker.scss';
import WixComponent from '../BaseComponents/WixComponent';
import {Add} from '../Icons/dist';
import uniqueId from 'lodash/uniqueId';

class FilePicker extends WixComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedFileName: props.subLabel
    };
    this.id = props.id || uniqueId('file_picker_input_');
  }

  onChooseFile(file) {
    const {maxSize, onChange} = this.props;

    if (file) {
      onChange(file);
      if (file.size <= maxSize) {
        this.setState({selectedFileName: file.name});
      }
    }
  }

  render() {
    const {header, mainLabel, supportedFormats, error, errorMessage} = this.props;

    return (
      <div className={styles.container}>
        {header && (<span className={styles.header}>{header}</span>)}
        <label className={styles.label} htmlFor={this.id}>
          <div className={styles.icon}><Add width="42" height="42"/></div>
          <div>
            <span className={styles.cta} data-hook="main-label">{mainLabel}</span>
            <span className={styles.info} data-hook="sub-label">{this.state.selectedFileName}</span>
            {error && <span data-hook="filePicker-error" className={styles.error}>{errorMessage}</span>}
          </div>
        </label>
        <input id={this.id} className={styles.input} type="file" accept={supportedFormats} onChange={e => this.onChooseFile(e.target.files[0])}/>
      </div>
    );
  }
}

FilePicker.defaultProps = {
  mainLabel: 'Choose File',
  subLabel: 'No file chosen (Max size 5 MB)',
  onChange: () => {},
  supportedFormats: '*',
  errorMessage: '',
  maxSize: 5000000  //5MB
};

FilePicker.propTypes = {
  header: PropTypes.string,
  onChange: PropTypes.func,
  mainLabel: PropTypes.string,
  subLabel: PropTypes.string,
  supportedFormats: PropTypes.string,
  maxSize: PropTypes.number,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default FilePicker;
