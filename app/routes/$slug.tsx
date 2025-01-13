import { useLoaderData } from "react-router-dom";

import {
  StoryblokComponent,
  type ISbStoryData,
  useStoryblokState
} from "@storyblok/react";
import { StoryblokCMS } from "~/utils/cms";
import { useEffect, useState } from "react";

export async function loader({ params }: { params: { slug?: string } }) {
  const slug = params.slug ?? "home"; 


  try {
    const story = await StoryblokCMS.getStory({ slug: [slug] });
    if (!story) {
      throw new Response("Story not found", { status: 404 });
    }
    
    return { story };
  } catch (error) {
    console.error("Error fetching Storyblok data:", error);
    throw new Response("Failed to fetch data", { status: 500 });
  }
}

export default function Page() {
  const { story } = useLoaderData<{ story: ISbStoryData }>();
  console.log("story in page", story);
  
  const liveStory = useStoryblokState(story);
  

  if (!liveStory) {
    return <div>404: Story not found</div>;
  }
  
  return (
    <main>
      <h1>{liveStory.name}</h1>
      <StoryblokComponent blok={liveStory.content} />
    </main>
  );
}