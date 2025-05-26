import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import img from '../../assets/image.webp';


const ImageGallery = ({ images }) => {
  const hasImages = images && images.length > 0;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: hasImages,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });


  useEffect(() => {
    if (!hasImages) return;

    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [instanceRef, hasImages]);

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setOpen(true);
  };

  const imagesToShow = hasImages ? images : [img];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main Slider */}
      <div
        ref={sliderRef}
        className={`keen-slider rounded-md overflow-hidden w-full h-[18rem] md:h-[25rem] ${!hasImages ? 'cursor-default' : 'cursor-pointer'}`}
      >
        {imagesToShow.map((imageSrc, idx) => (
          <div
            key={idx}
            className="keen-slider__slide flex justify-center items-center"
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
      </div>

      {/* Thumbnails */}
      {hasImages && (
        <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
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

      {/* Image Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl bg-black border-none p-0 overflow-hidden">
          <img src={selectedImage} alt="Enlarged" className="w-full h-full object-cover" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
