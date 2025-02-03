import { StoryblokComponent } from "@storyblok/react";

type ArticleContentProps = {
    blok: {
        _uid: string;
        title: string;
        content: any[];
    }
}


export default function ArticleContent({ blok }: ArticleContentProps) {

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 h-full">
            <h1 className="text-4xl font-thin">{blok.title}</h1>
                {blok.content.map((nestedBlok) => (
                <StoryblokComponent 
                    blok={nestedBlok} 
                />
            ))}

        </div>
    )
}
