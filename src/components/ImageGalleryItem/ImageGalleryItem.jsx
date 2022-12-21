import PropTypes from 'prop-types';
import { Image, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, clickHandler, modalImage }) => {
  return (
    <Item>
      <Image src={image} onClick={() => clickHandler(modalImage)} alt="Foto" />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  modalImage: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
