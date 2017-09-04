import React from 'react';
import PropTypes from 'prop-types';
import styles from './ModalSelector.scss';
import WixComponent from '../BaseComponents/WixComponent';
import Modal from '../Modal/Modal';
import MessageBoxFunctionalLayout from 'wix-style-react/MessageBox/MessageBoxFunctionalLayout';

class ModalSelector extends WixComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
    // contentLabel: PropTypes.string.isRequired,
    // theme: PropTypes.oneOf(Object.keys(colors)),
    // children: PropTypes.any,
    // zIndex: PropTypes.number,
    // shouldCloseOnOverlayClick: PropTypes.bool,
    // onRequestClose: PropTypes.func,
    // onAfterOpen: PropTypes.func,
    // horizontalPosition: PropTypes.oneOf(Object.keys(positions)),
    // verticalPosition: PropTypes.oneOf(Object.keys(positions)),
    // closeTimeoutMS: PropTypes.number,
    // scrollable: PropTypes.bool,
    // scrollableContent: PropTypes.bool
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
        scrollableContent={true}>
        <MessageBoxFunctionalLayout
            theme="blue"
            title="Choose Your Items"
            confirmText="OK"
            cancelText="Cancel"
            onOk={onOk}
            onCancel={onCancel}
            >
            MODAL SELECTOR CONSTANT CONTENT
            {children}
          </MessageBoxFunctionalLayout>
      </Modal>
    );
  }
}

export default ModalSelector;
