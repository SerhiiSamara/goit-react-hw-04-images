import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'Api';
import { LoadMore } from './Button/Button';
import { Container } from './App.styled';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    saerchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    isloadMore: false,
    currentImage: false,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.saerchQuery !== this.state.saerchQuery ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({
          isLoading: true,
          error: null,
          isloadMore: true,
        });
        const searchImages = await fetchImages(
          this.state.saerchQuery,
          this.state.page
				);
				const searchImagesFormated = searchImages.map(searchImage=>({ id:searchImage.id, webformatURL:searchImage.webformatURL, largeImageURL:searchImage.largeImageURL }));
				this.setState(prevState => ({
          images: [...prevState.images, ...searchImagesFormated],
        }));
        if (searchImages.length !== 12) {
          this.setState.apply({ isloadMore: false });
        }
      } catch {
        this.setState({
          error: 'Щось пішло не так, спробуйте ще раз!',
        });
        toast.error('Щось пішло не так, спробуйте ще раз!');
      } finally {
        this.setState({ isLoading: false });
      }
    }
    if (this.state.page > 1) {
      this.onSmoothScroll();
    }
  }

  handleSubmit = term =>
    this.setState({
      saerchQuery: term,
      images: [],
      page: 1,
    });

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = image => {
    this.setState({ currentImage: image });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  onSmoothScroll = () => {
    const pageHeight = document.documentElement.scrollHeight;
    window.scroll({
      top: pageHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, isloadMore, currentImage, isLoading, error } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onModal={this.openModal} />
        {isLoading && <Loader />}
        {isloadMore && !error && <LoadMore clickHandler={this.loadMore} />}
        {currentImage && (
          <Modal image={currentImage} offModal={this.closeModal} />
        )}
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
  }
}
