import { storyblokEditable } from "@storyblok/react";

type LinkBlockProps = {
    blok: {
        _uid: string;
        link: {
            id: string;        
            cached_url: string;
        };
        title: string;
    }
}

export default function LinkBlock({ blok }: LinkBlockProps) {
    return (
        <div {...storyblokEditable(blok)} key={blok._uid}>
            <a 
            href={`/${blok.link.cached_url}`}
            title={blok.title}
            className="text-font-thin text-sm hover:text-gray-500">  
                {blok.title}   
            </a>
        </div>
    )
}
