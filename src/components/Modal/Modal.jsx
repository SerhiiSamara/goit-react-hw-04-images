import PropTypes from 'prop-types';
import { Backdrop, ModalContainer } from './Modal.styled';
import { useEffect } from 'react';

export const Modal = ({ image, offModal }) => {
  const closeByClick = e => {
    const backdrop = document.querySelector('.backdrop');

    if (backdrop === e.target) {
      offModal();
    }
  };

  useEffect(() => {
    const closeByEscape = e => {
      if (e.code === 'Escape') {
        offModal();
      }
    };
    window.addEventListener('keydown', closeByEscape);
    return () => {
      window.removeEventListener('keydown', closeByEscape);
    };
  }, [offModal]);

  return (
    <Backdrop className="backdrop" onClick={closeByClick}>
      <ModalContainer className="modal">
        <img src={image} alt="Foto" />
      </ModalContainer>
    </Backdrop>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  offModal: PropTypes.func.isRequired,
};
