import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { useLoaderData } from "react-router-dom";
import { loader } from "../routes/$slug";

type PageProps = {
  blok: {
    _uid: string;
    body: any[];
  };
};

export default function Page({ blok }: PageProps) {

  const { story } = useLoaderData<typeof loader>();
  console.log("story", story);
  
  return (
    <main {...storyblokEditable(blok)} key={blok._uid}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}