import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

type PageProps = {
  blok: {
    _uid: string;
    newsPageblock: any[];
  };
};

const NewsPage = ({ blok }: PageProps) => {

  return (
    <main {...storyblokEditable(blok)} key={blok._uid} >
        <h1>News</h1>

    {blok.newsPageblock.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>

  )

};

export default NewsPage;