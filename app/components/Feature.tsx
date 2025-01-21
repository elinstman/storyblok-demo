import { storyblokEditable } from "@storyblok/react";

type FeatureProps = {
    blok: {
        _uid: string;
        name: string;
        featureText: string;
        image: {
            filename: string;
            alt: string;
        }
        featureButton: {
            title: string;
            cached_url: string;
        }
    }
}

export default function Feature({ blok }: FeatureProps) {

    return (
        <section {...storyblokEditable(blok)} key={blok._uid}  className="w-full relative h-[550px] overflow-hidden">
            <div  className="relative w-full h-full"> 
            <img src={blok.image.filename} alt={blok.image.alt} className="absolute inset-0 w-full h-full object-cover object-center"/>
            </div>
                
                <div className="absolute inset-x-0 bottom-20 flex flex-col items-center justify-center gap-2.5">
                <p className="text-white z-10"> {blok.name} </p>
                <h2 className="text-2xl text-white pb-2"> {blok.featureText} </h2>
               

                <button className="relative overflow-hidden text-xs px-7 py-3 border-2 border-white text-black group bg-white hover:bg-transparent hover:text-white duration-300 ease-in-out transform scale-x-100 group-hover:scale-x-100 origin-left">
                    <a href={blok.featureButton.cached_url || '#'} className="relative z-10">{blok.featureButton.title || 'Click here'}</a>
                </button>
                
            </div>
        </section>
)
}
