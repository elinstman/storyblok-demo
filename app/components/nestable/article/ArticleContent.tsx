import { StoryblokComponent } from "@storyblok/react";

type ArticleContentProps = {
    blok: {
        _uid: string;
        title: string;
        content: any[];
    };
    story?: any;
}

export default function ArticleContent({ blok, story }: ArticleContentProps) {
    console.log("first_published_at in article content", story.first_published_at);
    const formattedDate = story?.first_published_at 
        ? new Date(story.first_published_at).toLocaleDateString('sv-SE')
        : null;

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 h-full">
            <h1 className="text-4xl font-thin">{blok.title}</h1>
            {blok.content.map((nestedBlok) => (
                <StoryblokComponent 
                    blok={nestedBlok} 
                    key={nestedBlok._uid}
                />
            ))}
            {formattedDate && (
                <div className="text-gray-500 text-sm mt-8 pt-4">
                    Publicerad: {formattedDate}
                </div>
            )}
        </div>
    )
}
