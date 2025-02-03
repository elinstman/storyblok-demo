import { useLoaderData } from "react-router-dom";
import { StoryblokComponent, useStoryblokState } from "@storyblok/react";
import { useStoryblok } from "~/components/storyblokProvider";
import type { LoaderFunctionArgs } from "react-router-dom";
import { StoryblokCMS } from "~/utils/cms";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const story = await StoryblokCMS.getStory({slug: [`kundservice/blog/${params.slug}`]});
    
    if (!story) {
      throw new Response("Blog not found", { status: 404 });
    }
    
    return { story };
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw new Response("Failed to fetch blog", { status: 500 });
  }
}

export default function BlogPage() {
  const { story } = useLoaderData<typeof loader>();
  const storyblok = useStoryblok();
  const liveStory = useStoryblokState(story);

  if (!liveStory) {
    return <div>404: Blog not found</div>;
  }

  return (
    <main>
      <StoryblokComponent blok={liveStory.content} />
    </main>
  );
}
