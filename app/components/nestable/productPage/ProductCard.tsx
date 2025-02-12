type ProductCardProps = {
    blok: {
        _uid: string;
        brandName: string;
        productName: string;
        productLink: {
            cached_url: string;
        }
        image_1: {
            filename: string;
            alt: string;
        }
        image_2: {
            filename: string;
            alt: string;
        }
        currency: string;
        price: number;
        isDiscounted: boolean;
        discountPrice: number;
    }
}

export default function ProductCard({ blok }: ProductCardProps) {
    return (
        <a 
            href={blok.productLink.cached_url} 
            className="group/card flex flex-col h-full w-full max-w-sm hover:opacity-90 transition-opacity duration-300 m-16"
        >
            {/* Image container with fixed aspect ratio */}
            <div className="relative aspect-square w-full overflow-hidden mb-4 hover:scale-95 transition-all duration-600 group">
                <img 
                    src={blok.image_1.filename} 
                    alt={blok.image_1.alt} 
                    className="object-contain w-full h-full absolute top-0 left-0 transition-opacity duration-300 group-hover:opacity-0"
                />
                <img 
                    src={blok.image_2.filename} 
                    alt={blok.image_2.alt} 
                    className="object-contain w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
            </div>
            {/* Product info container */}
            <div className="flex flex-col">
                <h3 className="text-sm font-semibold mb-2 text-left">{blok.brandName}</h3>
                <h3 className="text-sm font-thin mb-2 text-left">{blok.productName}</h3>
                <div className="flex items-center gap-2">
                    {blok.isDiscounted && (
                        <p className="text-red-500 font-semibold">{blok.discountPrice} {blok.currency}</p>
                    )}
                    <p className={`text-gray-700 font-semibold ${blok.isDiscounted ? 'line-through' : ''}`}>
                        {blok.price} {blok.currency}
                    </p>
                </div>
            </div>
        </a>
    );
}