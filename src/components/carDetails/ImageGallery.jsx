import React, { useState } from 'react';
import { cn } from '@/lib/utils'; 
import { ImagePlus } from 'lucide-react'; 

const ImageGallery = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  const handleThumbnailClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <div className="flex flex-col items-center gap-4">
   
      <div className="rounded-md overflow-hidden w-full h-[18rem] md:h-[25rem]">
        <img
          src={currentImage}
          className="w-full h-full object-cover aspect-square" 
        />
      </div>
     
      <div className="flex flex-wrap justify-center flex-row  items-center gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(image)}
            className={cn(
              "rounded-md shadow-sm overflow-hidden w-20 h-20 md:w-24 md:h-24 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary",
              currentImage === image ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100 transition-opacity duration-200"
            )}
          >
            <img
              src={image}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;