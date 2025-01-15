import { useLoaderData } from "react-router-dom";

import {
  StoryblokComponent,
  type ISbStoryData,
  useStoryblokState
} from "@storyblok/react";
import { StoryblokCMS } from "~/utils/cms";
import ConfigLayout from "./layout";

export async function loader({ params }: { params: { slug?: string } }) {
  const slug = params.slug ?? "home"; 

  try {
    const [story, config] = await Promise.all([
      StoryblokCMS.getStory({ slug: [slug] }),
      StoryblokCMS.getConfig()
    ]);

    if (!story) {
      throw new Response("Story not found", { status: 404 });
    }
    
    return { story, config };
  } catch (error) {
    console.error("Error fetching Storyblok data:", error);
    throw new Response("Failed to fetch data", { status: 500 });
  }
}

export default function Page() {
  const { story, config } = useLoaderData<{ story: ISbStoryData, config: ISbStoryData }>();
  
  const liveStory = useStoryblokState(story);
  

  if (!liveStory) {
    return <div>404: Story not found</div>;
  }
  
  return (
    <ConfigLayout config={config.content}>
      <StoryblokComponent blok={liveStory.content} />
    </ConfigLayout>
  );
}


