import PropTypes from 'prop-types';
import React from 'react';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  largeImageURL,
  webformatURL,
  tags,
  modalOpen,
}) {
  const handleImgClick = e => {
    e.preventDefault();
    modalOpen(largeImageURL, tags);
  };

  return (
    <li className={s.item}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.img}
        onClick={handleImgClick}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  modalOpen: PropTypes.func.isRequired,
};
