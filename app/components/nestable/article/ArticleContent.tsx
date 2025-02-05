import { StoryblokComponent } from "@storyblok/react";

type ArticleContentProps = {
    blok: {
        _uid: string;
        title: string;
        content: any[];
        first_published_at?: string;
    }
}

export default function ArticleContent({ blok }: ArticleContentProps) {
    const formattedDate = blok.first_published_at 
        ? new Date(blok.first_published_at).toLocaleDateString('sv-SE')
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
                <div className="text-gray-500 text-sm mt-8 pt-4 border-t">
                    Publicerad: {formattedDate}
                </div>
            )}
        </div>
    )
}
