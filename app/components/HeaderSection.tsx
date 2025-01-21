import { storyblokEditable, renderRichText } from "@storyblok/react";
import type { ISbRichtext } from "@storyblok/react";

type HeaderSectionProps = {
    blok: {
        _uid: string;
        title: string;
        background: {
            filename: string;
            alt: string;
        }
        description: ISbRichtext;
    }
}

export default function SectionHeader({ blok }: HeaderSectionProps) {

    return (
    <section {...storyblokEditable(blok)} key={blok._uid} className="w-full relative h-[550px] overflow-hidden">
        <div className="relative w-full h-full">
            <img src={blok.background.filename} alt={blok.background.alt} className="absolute inset-0 w-full h-full object-cover object-center"/>
        </div>
        <div className="absolute inset-x-0 bottom-20 flex flex-col items-center justify-center gap-2.5">
            <p className="text-white text-lg z-10">{blok.title}</p>
            <div
            className="text-center"
            dangerouslySetInnerHTML={{ __html: renderRichText(blok.description) ?? '' }}
            ></div>
        </div>
    </section>
    )
}
