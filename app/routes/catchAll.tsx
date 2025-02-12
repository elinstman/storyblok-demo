import { useLoaderData } from "react-router";
import { StoryblokComponent, useStoryblokState } from "@storyblok/react";
import { useStoryblok } from "~/components/storyblokProvider";
import type { LoaderFunctionArgs } from "react-router";
import { StoryblokCMS } from "~/utils/cms";

export async function loader({ params }: LoaderFunctionArgs) {
  // console.log('Page via catchAll loader called with params:', params);
  
  try {
    const story = await StoryblokCMS.getStory({ slug: [`/${params["*"]}`] });

      
    if (!story) {
      throw new Response("page not found", { status: 404 });
    }
    
    return { story };
  } catch (error) {
    console.error("Error fetching page:", error);
    throw new Response("Failed to fetch page", { status: 500 });
  }
}


export default function AllPages() {
  // console.log('Page via catchAll component rendering');
  const { story } = useLoaderData<typeof loader>();
  const storyblok = useStoryblok();
  const liveStory = useStoryblokState(story);



  if (!liveStory) { 
    return <div>404: Page not found</div>;
  }


  return (
    <main>
      <StoryblokComponent 
        blok={liveStory.content} 
        story={liveStory}
      />
    </main>
  );
}
