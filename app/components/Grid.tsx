import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

type GridProps = {
    blok: {
        _uid: string;
        columns: any;    
    }
}

export default function Grid({ blok }: GridProps) {
    
    return (
        <ul {...storyblokEditable(blok)} key={blok._uid} className="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-center">
    {blok.columns.map((blok: any) => (
      <li key={blok._uid}>
        <StoryblokComponent blok={blok} />
      </li>
    ))}
  </ul>
    )
}