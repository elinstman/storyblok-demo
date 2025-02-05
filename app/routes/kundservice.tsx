// import { useLoaderData } from "react-router-dom";
// import { StoryblokComponent, useStoryblokState } from "@storyblok/react";
// import { useStoryblok } from "~/components/storyblokProvider";
// import type { LoaderFunctionArgs } from "react-router-dom";
// import { StoryblokCMS } from "~/utils/cms";

// export async function loader({ params }: { params: { slug?: string } }) {
// const slug = params.slug ?? "kundservices";
//   try {
//     const story = await StoryblokCMS.getStory({slug: [slug]});
    

//     if (!story) {
//       throw new Response("Kundservice landing page not found", { status: 404 });
//     }
    
//     return { story };
//   } catch (error) {
//     console.error("Error fetching kundservice:", error);
//     throw new Response("Failed to fetch kundservice", { status: 500 });
//   }
// }

// export default function LandingPage() {
//   const { story } = useLoaderData<typeof loader>();
//   const storyblok = useStoryblok();
//   const liveStory = useStoryblokState(story);

//   if (!liveStory) {
//     return <div>404: Landing not found</div>;
//   }

//   return (
//     <main>
//       <StoryblokComponent blok={liveStory.content} />
//     </main>
//   );
// }
