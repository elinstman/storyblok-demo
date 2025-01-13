import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { useLoaderData } from "react-router-dom";
import { loader } from "../routes/$slug";

type PageProps = {
  blok: {
    _uid: string;
    body: any[];
  };
};

const Page = ({ blok }: PageProps) => {
  console.log("blok in Page", blok);

  return (
    <main {...storyblokEditable(blok)} key={blok._uid} className="px-4">
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
  )

};

export default Page;