import { StoryblokComponent, storyblokEditable } from "@storyblok/react"

type ArticleHeroProps = {
    blok: {
        _uid: string
        articleImage: {
            filename: string
            alt: string
        }
    }
}


export default function ArticleHero({blok}: ArticleHeroProps) {
    return (
        <section {...storyblokEditable(blok)} key={blok._uid} className="w-full relative h-[450px] overflow-hidden"> 
        <div className="relative w-full h-full">
            <img src={blok.articleImage.filename} alt={blok.articleImage.alt} 
            className="absolute inset-0 w-full h-full object-cover object-center" />
        </div>
        </section>
    )
}
