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

// export class App extends Component {
//   static propTypes = {};

//   state = {
//     searchQuery: '',
//     currentPage: 1,
//     imagesData: [],
//     perPage: 12,
//     isMoreImages: 1,
//     isLoading: false,
//     modal: { src: '', alt: '', isOpen: false },
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.searchQuery === '') {
//       Report.warning('Please enter your search query');
//       return;
//     }
//     if (
//       prevState.searchQuery !== this.state.searchQuery ||
//       prevState.currentPage !== this.state.currentPage
//     ) {
//       this.setState({ isLoading: true });
//       this.fetchImages();
//     }
//   }

//   handleSearchQuery = (searchQuery, perPage) => {
//     this.setState(() => ({
//       searchQuery: searchQuery,
//       perPage: perPage,
//       currentPage: 1,
//     }));
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({
//       currentPage: prevState.currentPage + 1,
//     }));
//   };

//   handleOpenModal = (large, alt) => {
//     this.setState({ modal: { src: large, alt, isOpen: true } });
//   };

//   handleCloseModal = () => {
//     this.setState({ modal: { isOpen: false } });
//   };

//   addSmoothScroll = () => {
//     const { height: cardHeight } = document
//       .getElementById('gallery')
//       .firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });
//   };

//   fetchImages = async () => {
//     const { searchQuery, currentPage, perPage } = this.state;
//     const imagesData = await PixabayAPI(searchQuery, currentPage, perPage);
//     if (currentPage === 1) {
//       this.setState(() => ({
//         imagesData: imagesData.data.hits,
//         isMoreImages: imagesData.data.totalHits / this.state.perPage,
//       }));
//       window.scrollTo({
//         top: 0,
//       });
//     } else {
//       this.setState(prevState => ({
//         imagesData: [...prevState.imagesData, ...imagesData.data.hits],
//       }));
//       this.addSmoothScroll();
//     }
//     this.setState({ isLoading: false });
//   };

//   render() {
//     const {
//       imagesData,
//       isLoading,
//       isMoreImages,
//       currentPage,
//       modal: { src, alt, isOpen },
//     } = this.state;
//     const isLoadMore = isMoreImages > currentPage && !isLoading;
//     return (
//       <div className="app">
//         <Searchbar onSubmit={this.handleSearchQuery} />
//         <main>
//           <ImageGallery
//             imagesData={imagesData}
//             modalOpen={this.handleOpenModal}
//           />
//           {isLoadMore && <Button onClick={this.handleLoadMore} />}
//           {isLoading && <Loader />}
//           {isOpen && (
//             <Modal src={src} alt={alt} modalClose={this.handleCloseModal} />
//           )}
//         </main>
//       </div>
//     );
//   }
// }
