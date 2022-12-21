import PropTypes from 'prop-types';
import { Container } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onModal }) => {
  if (images.length === 0) {
    return;
  }
  return (
    <Container className="gallery">
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          image={webformatURL}
          modalImage={largeImageURL}
          clickHandler={onModal}
        />
      ))}
    </Container>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onModal: PropTypes.func.isRequired,
};
