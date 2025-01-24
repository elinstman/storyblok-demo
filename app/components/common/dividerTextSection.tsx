import type { ISbRichtext } from "@storyblok/react";
import { renderRichText } from "@storyblok/react";
import { Link } from "react-router-dom";

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
        dividerButtom: {
            title: string;
            cached_url: string;
            linktype: string;
            story?: {
                url: string;
            }
        }
        showButtom: boolean;
    }
}

export default function DividerTextSection({ blok }: DividerTextSectionProps) {
    


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
            {blok.showButtom && (
                <div className="flex justify-center mt-4">
                    <button className="bg-white border border-black text-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-300">
                       <a href={blok.dividerButtom.cached_url}>
                            {blok.dividerButtom.title}
                       </a>
                    </button>
                </div>
            )}
        </div>
    )
}