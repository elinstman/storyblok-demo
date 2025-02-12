import { StoryblokComponent, useStoryblokState } from "@storyblok/react";

type PostsProps = {
    blok: {
        postBlock: any[]
    },
    story?: any
}

export default function Posts({blok, story}: PostsProps) {
    return (
        <div>
            {blok.postBlock?.map((nestedBlok) => (
                <StoryblokComponent 
                    blok={nestedBlok}
                    key={nestedBlok._uid}
                    story={story}
                />
            ))}
        </div>
    )
}
