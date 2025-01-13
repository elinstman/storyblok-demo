import { useLoaderData } from "react-router-dom";

import {
  getStoryblokApi,
  StoryblokComponent,
  type ISbStoryParams,
  type ISbStoryData,
  useStoryblokState
} from "@storyblok/react";
import { StoryblokCMS } from "~/utils/cms";


export async function loader({ params }: { params: { slug?: string } }) {
  const slug = params.slug ?? "home"; 

  console.log("storyblokapi", StoryblokCMS.getStory);

  try {
    const { data } = await StoryblokCMS.getStory({ slug: [slug] });
    console.log("data in loader", data);

    if (!data?.story) {
      throw new Response("Story not found", { status: 404 });
    }
    console.log("data in loader", data);
    return { story: data.story };
  } catch (error) {
    console.error("Error fetching Storyblok data:", error);
    throw new Response("Failed to fetch data", { status: 500 });
  }
}

export default function Page() {
  const { story } = useLoaderData() as { story: ISbStoryData };
  const liveStory = useStoryblokState(story);

  if (!liveStory) {
    return <div>404: Story not found</div>;
  }
  
  return (
    <main>
      <h1>{story.name}</h1>
      <StoryblokComponent blok={liveStory.content} />
    </main>
  );
}