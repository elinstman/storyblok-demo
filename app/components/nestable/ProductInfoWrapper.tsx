import { storyblokEditable } from "@storyblok/react";

type ProductInfoWrapperProps = {
    blok: {
        _uid: string;
        brandName: string;
        productName: string;
        isDiscounted: boolean;
        productPrice: number;
        discountPrice: number;
        currency: string;
    }
}

export default function ProductInfoWrapper({ blok }: ProductInfoWrapperProps) {
    return (
            <div 
            {...storyblokEditable(blok)} 
            className=" flex flex-col w-[500px] mx-auto my-10 gap-2.5"
        >
            <p className="text-md font-thin mb-2 text-left">{blok.brandName}</p>
            <p className="text-2xl font-thin mb-2 text-left">{blok.productName}</p>
            <div className="flex items-center gap-2">
            {blok.isDiscounted && (
                <p className="text-red-500 font-semibold">{blok.discountPrice} {blok.currency}</p>
            )}
            <p className={`text-gray-700 font-semibold ${blok.isDiscounted ? 'line-through text-grey-400' : ''}`}>{blok.productPrice} {blok.currency}</p>            
        </div>
        </div>
    )
}