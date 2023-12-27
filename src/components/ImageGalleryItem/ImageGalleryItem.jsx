import { Gallery } from 'components/ImageGallery/ImageGallery.styled';
import { GalleryImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ images, onClick }) => {
  return (
    <Gallery>
      {images &&
        images.map(({ largeImageURL, tags, webformatURL, id }) => (
          <GalleryImage className="gallery-item" key={id}>
            <img
              src={webformatURL}
              alt={tags}
              onClick={() => onClick(largeImageURL)}
              width={240}
              height={200}
            />
          </GalleryImage>
        ))}
    </Gallery>
  );
};

export default ImageGalleryItem;
