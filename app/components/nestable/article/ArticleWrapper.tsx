import { storyblokEditable } from "@storyblok/react";
import { StoryblokComponent } from "@storyblok/react";

type ArticleWrapperProps = {
    blok: {
        _uid: string;
        background: string;
        category: string[];
        article: any[];
    };
    story?: any;
}

export default function ArticleWrapper({ blok, story }: ArticleWrapperProps) {
    return (
        <section 
            {...storyblokEditable(blok)} 
            key={blok._uid} 
            className="w-full relative pt-0"
            style={{ backgroundColor: blok.background }}
        >
            <div className="container mx-auto px-4 transform -translate-y-32">
               {blok.article.map((nestedBlok) => (
                <StoryblokComponent 
                    blok={nestedBlok}
                    key={nestedBlok._uid}
                    story={story}
                />
               ))}
            </div>  
        </section>
    )
}
    