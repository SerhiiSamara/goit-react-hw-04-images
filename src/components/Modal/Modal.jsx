import { Component } from 'react';
import PropTypes from 'prop-types';
import { Backdrop, ModalContainer } from './Modal.styled';

export class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    offModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeByEscape);
    window.addEventListener('click', this.closeByClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEscape);
    window.removeEventListener('click', this.closeByClick);
  }

  closeByEscape = e => {
    if (e.code === 'Escape') {
      this.props.offModal();
    }
  };

  closeByClick = e => {
    const backdrop = document.querySelector('.backdrop');

    if (backdrop === e.target) {
      this.props.offModal();
    }
  };

  render() {
    const { image } = this.props;
    return (
      <Backdrop className="backdrop" onClick={this.closeByClick}>
        <ModalContainer className="modal">
          <img src={image} alt="Foto" />
        </ModalContainer>
      </Backdrop>
    );
  }
}
