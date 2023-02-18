import React, { useState, useEffect } from 'react';

import {
  Button,
  ImageGallery,
  Loader,
  Modal,
  PixabayAPI,
  Searchbar,
} from './index';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesData, setImagesData] = useState([]);
  const [perPage, setPerPage] = useState(12);
  const [isMoreImages, setIsMoreImages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ src: '', alt: '', isOpen: false });

  useEffect(() => {
    const fetchImages = async (searchQuery, perPage, currentPage) => {
      try {
        const imagesData = await PixabayAPI(searchQuery, currentPage, perPage);
        if (currentPage === 1) {
          setImagesData(imagesData.data.hits);
          setIsMoreImages(imagesData.data.totalHits / perPage);
          window.scrollTo({
            top: 0,
          });
        } else {
          setImagesData(prevState => [...prevState, ...imagesData.data.hits]);
          setTimeout(() => {
            addSmoothScroll();
          }, 100);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages(searchQuery, perPage, currentPage);
    if (currentPage !== 1) {
    }
  }, [searchQuery, perPage, currentPage]);

  const handleSearchQuery = (searchQuery, perPage) => {
    setSearchQuery(searchQuery);
    setPerPage(perPage);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const handleOpenModal = (large, alt) => {
    setModal({ src: large, alt, isOpen: true });
  };

  const handleCloseModal = () => {
    setModal({ src: '', alt: '', isOpen: false });
  };

  const addSmoothScroll = () => {
    const { height: cardHeight } = document
      .getElementById('gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  };

  const isLoadMore = isMoreImages > currentPage && !isLoading;
  return (
    <div className="app">
      <Searchbar onSubmit={handleSearchQuery} />
      <main>
        <ImageGallery imagesData={imagesData} modalOpen={handleOpenModal} />
        {isLoadMore && <Button onClick={handleLoadMore} />}
        {isLoading && <Loader />}
        {modal.isOpen && (
          <Modal
            src={modal.src}
            alt={modal.alt}
            modalClose={handleCloseModal}
          />
        )}
      </main>
    </div>
  );
}