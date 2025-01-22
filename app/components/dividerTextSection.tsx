import type { ISbRichtext } from "@storyblok/react";
import { renderRichText } from "@storyblok/react";

const schema = {
    resolver: (component: string, data: any) => {
        if (component === 'paragraph') {
            return {
                class: 'font-thin'
            };
        }
        return {};
    }
};

type DividerTextSectionProps = {
    blok: {
        _uid: string;
        dividerTitle: string;
        dividerDescription: ISbRichtext;
    }
}

export default function DividerTextSection({ blok }: DividerTextSectionProps) {
    console.log("blok in dividerTextSection", blok);
    return (
        <div className="my-12">
            <p className="text-center text-2xl font-thin">
                {blok.dividerTitle}    
            </p>
            <div 
                className="text-center text-black"
                dangerouslySetInnerHTML={{ __html: renderRichText(blok.dividerDescription, schema) ?? '' }}
            >
            </div>
        </div>
    )
}