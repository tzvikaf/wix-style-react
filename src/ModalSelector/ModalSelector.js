import React from 'react';
import PropTypes from 'prop-types';
// import styles from './ModalSelector.scss';
import WixComponent from '../BaseComponents/WixComponent';
import Modal from '../Modal/Modal';
import Search from './Search';
import MessageBoxFunctionalLayout from 'wix-style-react/MessageBox/MessageBoxFunctionalLayout';


class ModalSelector extends WixComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
  }

  static defaultProps = {
    isOpen: false,
    onOk: () => { },
    onRequestClose: () => { },
    onCancel: () => { },
  }

  render() {
    const {
      isOpen,
      onOk,
      onRequestClose,
      onCancel,
      children
    } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Items Selection Modal"
        scrollableContent={true}
        >
        <MessageBoxFunctionalLayout
          theme="blue"
          title="Choose Your Items"
          confirmText="OK"
          cancelText="Cancel"
          onOk={onOk}
          onCancel={onCancel}
          >
          {children}
        </MessageBoxFunctionalLayout>
      </Modal>
    );
  }
}

ModalSelector.Search = Search;

export default ModalSelector;
