import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import {
  StoryblokComponent,
  type ISbStoryData,
  useStoryblokState
} from "@storyblok/react";
import { StoryblokCMS } from "~/utils/cms";

export async function loader({ params }: { params: { slug?: string } }) {
  console.log('Loader in $slug.tsx called with params:', params);
  const slug = params.slug ?? "home";

  try {
    const story = await StoryblokCMS.getStory({ 
      slug: [slug]  // Pass as array to match the type
    });
   
    if (!story) {
      throw new Response("Story not found", { status: 404 });
    }
    
    return { story };
  } catch (error) {
    console.error(`Error fetching ${slug}:`, error);
    throw new Response(`Failed to fetch ${slug}`, { status: 500 });
  }
}

export default function Page() {
  const { story } = useLoaderData<{ story: ISbStoryData }>();
  const liveStory = useStoryblokState(story);

  if (!liveStory) {
    return <div>404: Story not found</div>;
  }
  
  return (
    <main>
      <StoryblokComponent blok={liveStory.content} story={liveStory}  />
    </main>
  );
}


