import { StoryblokComponent } from "@storyblok/react";

type PostsProps = {
    blok: {
        postBlock: any[]
    }
}

export default function Posts({blok}: PostsProps) {
    
    return (
        <div>
            {blok.postBlock?.map((nestedBlok) => (
                <StoryblokComponent 
                    blok={nestedBlok} 
                    key={nestedBlok._uid} 
                />
            ))}
        </div>
    )
}
