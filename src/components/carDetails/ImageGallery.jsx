import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import img from '../../assets/image.webp';
import useFetchFavorites from '@/hooks/getFavCars';
import { Share2 } from 'lucide-react';
import LikeButton from '../LikeButton';

const ImageGallery = ({ images, video, carId ,car }) => {
  const hasImages = images && images.length > 0;
  const multipleImages = hasImages && images.length > 1;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const { data } = useFetchFavorites();

  const [sliderRef, instanceRef] = useKeenSlider(
    multipleImages
      ? {
        loop: true,
        initial: 0,
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel);
        },
      }
      : null
  );

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setFavoriteIds(data.data.map(car => car.id));
    }
  }, [data]);

  useEffect(() => {
    if (!multipleImages) return;

    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [instanceRef, multipleImages]);

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setOpen(true);
  };

  const prepareShareMessage = (carDetails) => {
    return `
            ${carDetails.brand?.name || ''} ${carDetails.model?.name || ''} ${carDetails.year_production || ''} - للبيع \n
 ${carDetails.description} \n
 ${carDetails.images[0]}
    `
  };

  const handleShareClick = async (e) => {
    const message = prepareShareMessage(car);

    if (navigator.share) {
      await navigator.share({
        text: message,
      });
    } else {
      await navigator.clipboard.writeText(message);
    }
  };

  const imagesToShow = hasImages ? images : [img];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main Image or Slider */}
      <div
        ref={multipleImages ? sliderRef : null}
        className={`${multipleImages ? 'keen-slider' : ''
          } relative rounded-md overflow-hidden w-full h-[18rem] md:h-[25rem] ${!hasImages ? 'cursor-default' : 'cursor-pointer'
          }`}
      >
        <div className="absolute top-2 right-2 z-20 flex md:hidden items-center gap-2">
     
          <div className="bg-black/40 p-2 rounded-full backdrop-blur-sm">
            <Share2
              onClick={handleShareClick}
              className="text-white w-5 h-5 cursor-pointer hover:text-primary"
            />
          </div>

          <div className="bg-black/40 p-2 rounded-full backdrop-blur-sm">
            <LikeButton
              itemType="car"
              itemId={carId}
              isFavorite={favoriteIds.includes(carId)}
            />
          </div>
        </div>


        {imagesToShow.map((imageSrc, idx) => (
          <div
            key={idx}
            className={`${multipleImages ? 'keen-slider__slide' : ''} flex justify-center items-center`}
            onClick={() => hasImages && handleImageClick(imageSrc)}
          >
            <img
              src={imageSrc}
              alt={`slide-${idx}`}
              className="object-cover w-full h-full rounded-md"
              style={{ aspectRatio: '600/400' }}
            />
          </div>
        ))}

        {/* Video Icon */}
        {video && (
          <a
            href={video}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 left-2 bg-black/60 text-white p-2 rounded-full hover:bg-black transition z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h11a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
              />
            </svg>
          </a>
        )}
      </div>

      {/* Thumbnails */}
      {multipleImages && (
        <div className="hidden md:flex flex-wrap justify-center items-center gap-4 mt-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden shadow-sm ${currentSlide === idx ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                }`}
            >
              <img src={img} className="w-full h-full object-cover" alt={`thumb-${idx}`} />
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl bg-black border-none p-0 overflow-hidden">
          <img src={selectedImage} alt="Enlarged" className="w-full h-full object-cover" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
