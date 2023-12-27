import { Component } from 'react';
import SearchImages from '../api/SearchImages';
import { Button } from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    photos: [],
    query: '',
    page: 1,
    isVisibleBtn: false,
    loading: false,
    showModal: false,
    selectedImage: null,
  };
  getImage = async () => {
    const { query, page } = this.state;
    this.setState({ loading: true });
    try {
      const dataImages = await SearchImages(query, page);

      this.setState(prevState => ({
        photos: [...prevState.photos, ...dataImages.hits],
        isVisibleBtn: page < Math.ceil(dataImages.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ photos: [] });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.getImage();
    }
  }

  handleSubmit = query => {
    this.setState({ query, photos: [], page: 1, isVisibleBtn: false });
  };
  onBtnLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  toggleModal = selectedImage => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectedImage,
    }));
  };
  render() {
    const { photos, isVisibleBtn, loading, selectedImage, showModal } =
      this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={photos} onClick={this.toggleModal} />
        {loading && <Loader />}
        {isVisibleBtn && <Button onClick={this.onBtnLoadMoreClick} />}
        {showModal && (
          <Modal onClose={this.toggleModal} ImageUrl={selectedImage} />
        )}
      </div>
    );
  }
}
