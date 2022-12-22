import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { useEffect, useState } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'Api';
import { LoadMore } from './Button/Button';
import { Container } from './App.styled';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [saerchQuery, setSaerchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isloadMore, setIsloadMore] = useState(false);
  const [currentImage, setCurrentImage] = useState(false);

  useEffect(() => {
    if (saerchQuery === '') {
      return;
    }

    async function getImages() {
      try {
        setIsLoading(true);
        setError(null);
        setIsloadMore(true);
        const searchImages = await fetchImages(saerchQuery, page);
        const searchImagesFormated = searchImages.map(searchImage => ({
          id: searchImage.id,
          webformatURL: searchImage.webformatURL,
          largeImageURL: searchImage.largeImageURL,
        }));
        setImages(images => [...images, ...searchImagesFormated]);
        if (searchImages.length !== 12) {
          setIsloadMore(false);
        }
      } catch {
        setError('Щось пішло не так, спробуйте ще раз!');
        toast.error('Щось пішло не так, спробуйте ще раз!');
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [saerchQuery, page]);

  useEffect(() => {
    onSmoothScroll();
  }, [images]);

  const handleSubmit = term => {
    setSaerchQuery(term);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const openModal = image => {
    setCurrentImage(image);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  const onSmoothScroll = () => {
    const pageHeight = document.documentElement.scrollHeight;
    window.scroll({
      top: pageHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} onModal={openModal} />
      {isLoading && <Loader />}
      {isloadMore && !error && <LoadMore clickHandler={loadMore} />}
      {currentImage && <Modal image={currentImage} offModal={closeModal} />}
      <Toaster
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <GlobalStyle />
    </Container>
  );
};
