import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import Modal from '../Modal/Modal';
import Search from './Search';
import MessageBoxFunctionalLayout from '../MessageBox/MessageBoxFunctionalLayout';


class ModalSelector extends WixComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
  }

  static defaultProps = {
    isOpen: false,
    onOk: () => { },
    onClose: () => { },
    onCancel: () => { },
  }

  render() {
    const {
      isOpen,
      onOk,
      onClose,
      onCancel,
      children
    } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
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
          onClose={onClose}
          >
          {children}
        </MessageBoxFunctionalLayout>
      </Modal>
    );
  }
}

ModalSelector.Search = Search;

export default ModalSelector;
