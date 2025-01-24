import { useState } from 'react';
import { storyblokEditable } from "@storyblok/react";

type ProductImagesProps = {
  blok: {
    _uid: string;
    images: {
      _uid: string;
      image: {
        id: number;
        filename: string;
        alt: string;
      };
    }[];
  };
};

export default function ProductImages({ blok }: ProductImagesProps) {
  const [index, setIndex] = useState(0);
  const imagesArray = blok.images || [];
  const totalImages = imagesArray.length;

  if (totalImages === 0) {
    return <div>No images available</div>;
  }

  return (
    <div 
      {...storyblokEditable(blok)} 
      className="w-full max-w-[500px] mx-auto my-10"
    >
      {/* Main image with overlay arrows */}
      <div className="relative w-full aspect-square border border-gray-200 p-2">
        <img 
          src={imagesArray[index].image.filename} 
          alt={imagesArray[index].image.alt || ''}
          className="w-full h-full object-contain"
        />
        
        {/* Overlay arrows */}
        <button 
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
          onClick={() => setIndex(index === 0 ? totalImages - 1 : index - 1)}
        >
          ←
        </button>
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
          onClick={() => setIndex(index === totalImages - 1 ? 0 : index + 1)}
        >
          →
        </button>
      </div>

      {/* Thumbnail navigation */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {imagesArray.map((image, i) => (
          <button
            key={image._uid}
            onClick={() => setIndex(i)}
            className={`w-16 md:w-20 h-16 md:h-20 border ${
              i === index ? 'border-black' : 'border-gray-200'
            } p-1`}
          >
            <img
              src={image.image.filename}
              alt={image.image.alt || ''}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}