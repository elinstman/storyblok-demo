import { StoryblokComponent } from "@storyblok/react";

type ProductProps = {
  blok: {
    productBlock: any[];
  };
};

export default function Product({ blok }: ProductProps) {
  // Find each component by their type
  const productImages = blok.productBlock?.find(block => block.component === 'productImages');
  const productInfoWrapper = blok.productBlock?.find(block => block.component === 'productInfoWrapper');
  const productDescription = blok.productBlock?.find(block => block.component === 'productDescription');
      
  return (
    <div className="container mx-auto px-4">
      {/* Top section with images and info side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-7">
        {/* Product Images */}
        {productImages && (
          <div>
            <StoryblokComponent blok={productImages} key={productImages._uid} />
          </div>
        )}
        
        {/* Product Info */}
        {productInfoWrapper && (
          <div>
            <StoryblokComponent blok={productInfoWrapper} key={productInfoWrapper._uid} />
          </div>
        )}
      </div>

      {/* Description section below */}
      {productDescription && (
        <div className="mt-8">
          <StoryblokComponent blok={productDescription} key={productDescription._uid} />
        </div>
      )}
    </div>
  );
} 