import { storyblokEditable } from "@storyblok/react";

type TeaserProps = {
  blok: {
    _uid: string;
    headline: string;
  };
};

export default function Teaser({ blok }: TeaserProps) {

  return (
    <div {...storyblokEditable(blok)} key={blok._uid} 
    className="w-full relative overflow-hidden flex flex-col items-center justify-center"
    >
      <p className="text-4xl text-black font-bold mb-10">{blok.headline}</p>
    </div>
  );
}