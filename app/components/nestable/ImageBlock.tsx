import { storyblokEditable } from "@storyblok/react";

type ImageBlockProps = {
    blok: {
        _uid: string;
        image: {
            filename: string;
            alt: string;
        }
    }
}

export default function ImageBlock({ blok }: ImageBlockProps) {
    return (
        <div {...storyblokEditable(blok)} key={blok._uid}>
            <img 
                src={blok.image.filename} 
                alt={blok.image.alt} 
                className="w-full h-auto"
            />
        </div>
    )
}
