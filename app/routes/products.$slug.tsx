import { useLoaderData } from "react-router-dom";
import { StoryblokComponent, useStoryblokState } from "@storyblok/react";
import { useStoryblok } from "~/components/storyblokProvider";
import type { LoaderFunctionArgs } from "react-router-dom";
import { StoryblokCMS } from "~/utils/cms";

export async function loader({ params }: LoaderFunctionArgs) {
  
  try {
    const story = await StoryblokCMS.getStory({ slug: [`products/${params.slug}`] });

    
    if (!story) {
      throw new Response("Product not found", { status: 404 });
    }
    
    return { story };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Response("Failed to fetch product", { status: 500 });
  }
}

export default function ProductPage() {
  console.log('ProductPage component rendering');
  const { story } = useLoaderData<typeof loader>();
  const storyblok = useStoryblok();
  const liveStory = useStoryblokState(story);

  if (!liveStory) {
    return <div>404: Product not found</div>;
  }

  return (
    <main>
      <StoryblokComponent blok={liveStory.content} />
    </main>
  );
}
