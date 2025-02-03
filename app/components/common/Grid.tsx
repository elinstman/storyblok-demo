import { StoryblokComponent, storyblokEditable, renderRichText } from "@storyblok/react";
import type { ISbRichtext } from "@storyblok/react";


type GridProps = {
    blok: {
        _uid: string;
        description: ISbRichtext;
        columns: any[];    
    }
}

export default function Grid({ blok }: GridProps) {
    const gridClass = blok.columns.length <= 3 
        ? "grid md:grid-cols-3"
        : "grid md:grid-cols-4";

    
    return (
      <section >  
      <div
      className="text-center"
      dangerouslySetInnerHTML={{ __html: renderRichText(blok.description) ?? '' }}
      >
      </div>
      <ul {...storyblokEditable(blok)} key={blok._uid} className={gridClass}>
         
            {blok.columns.map((blok: any) => (
                <li key={blok._uid} className="flex justify-center">
                    <StoryblokComponent blok={blok} />
                </li>
            ))}
        </ul>
      </section>
        
    )
}