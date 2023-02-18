import PropTypes from 'prop-types';
import React from 'react';
import { ImageGalleryItem } from 'components';
import s from './ImageGallery.module.css';

export default function ImageGallery({ imagesData, modalOpen }) {
  return (
    <ul id="gallery" className={s.gallery}>
      {imagesData.length > 0 &&
        imagesData.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              tags={image.tags}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              modalOpen={modalOpen}
            />
          );
        })}
    </ul>
  );
}

ImageGallery.propTypes = {
  imagesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  modalOpen: PropTypes.func.isRequired,
};
