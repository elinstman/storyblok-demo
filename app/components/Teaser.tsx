import { storyblokEditable } from "@storyblok/react";

type TeaserProps = {
  blok: {
    _uid: string;
    headline: string;
  };
};

export default function Teaser({ blok }: TeaserProps) {
    console.log("blok i teaser", blok);
  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <h2>{blok.headline}</h2>
    </div>
  );
}