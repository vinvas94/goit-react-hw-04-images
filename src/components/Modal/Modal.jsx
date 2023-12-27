import { createPortal } from 'react-dom';
import { Component } from 'react';
import { ModalBackdrop, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <ModalBackdrop onClick={this.handleBackdropClick}>
        <ModalContent>
          <img src={this.props.ImageUrl} alt="" width={800} height={600} />
        </ModalContent>
      </ModalBackdrop>,
      modalRoot
    );
  }
}
