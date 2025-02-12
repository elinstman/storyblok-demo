import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

type PageProps = {
  blok: {
    _uid: string;
    body: any[];
  };
  story?: any;
};

const Page = ({ blok, story }: PageProps) => {
 
  return (
    <main {...storyblokEditable(blok)} key={blok._uid} >
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent 
        blok={nestedBlok}
        key={nestedBlok._uid}
        story={story}
      />
    ))}
  </main>
  )

};

export default Page;