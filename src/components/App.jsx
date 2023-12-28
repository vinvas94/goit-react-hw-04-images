import React, { useState, useEffect } from 'react';
import SearchImages from '../api/SearchImages';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isVisibleBtn, setIsVisibleBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const getImage = async () => {
    setLoading(true);
    try {
      const dataImages = await SearchImages(query, page);

      setPhotos(prevPhotos => [...prevPhotos, ...dataImages.hits]);
      setIsVisibleBtn(page < Math.ceil(dataImages.totalHits / 12));
    } catch (error) {
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) getImage();
  }, [query, page]);

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setPhotos([]);
    setPage(1);
    setIsVisibleBtn(false);
  };

  const onBtnLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = image => {
    setShowModal(!showModal);
    setSelectedImage(image);
  };

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
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={photos} onClick={toggleModal} />
      {loading && <Loader />}
      {isVisibleBtn && <Button onClick={onBtnLoadMoreClick} />}
      {showModal && <Modal onClose={toggleModal} ImageUrl={selectedImage} />}
    </div>
  );
};

export default App;
