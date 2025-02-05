import { useLoaderData } from "react-router-dom";
import { StoryblokComponent, useStoryblokState } from "@storyblok/react";
import { useStoryblok } from "~/components/storyblokProvider";
import type { LoaderFunctionArgs } from "react-router-dom";
import { StoryblokCMS } from "~/utils/cms";

export async function loader({ params }: LoaderFunctionArgs) {
  console.log('TestPage loader called with params:', params);
  
  try {
    const story = await StoryblokCMS.getStory({ slug: [`/${params["*"]}`] });

    
    if (!story) {
      throw new Response("test not found", { status: 404 });
    }
    
    return { story };
  } catch (error) {
    console.error("Error fetching test:", error);
    throw new Response("Failed to fetch test", { status: 500 });
  }
}


export default function TestPage() {
  console.log('TestPage component rendering');
  const { story } = useLoaderData<typeof loader>();
  const storyblok = useStoryblok();
  const liveStory = useStoryblokState(story);


  if (!liveStory) {
    return <div>404: Test not found</div>;
  }


  return (
    <main>
      <StoryblokComponent blok={liveStory.content} />
    </main>
  );
}
