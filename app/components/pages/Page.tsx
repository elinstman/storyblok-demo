import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

type PageProps = {
  blok: {
    _uid: string;
    body: any[];
  };
};

const Page = ({ blok }: PageProps) => {

  return (
    <main {...storyblokEditable(blok)} key={blok._uid} >
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
  )

};

export default Page;