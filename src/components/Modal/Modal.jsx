import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import s from './Modal.module.css';

export default function Modal({ alt, src, modalClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      modalClose();
    }
  };

  const handleModalClick = e => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  return (
    <div className={s.overlay} onClick={handleModalClick}>
      <div className={s.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};
