import { storyblokEditable } from "@storyblok/react";

type LatestBlogPostProps = {
  blok: {
    _uid: string;
    lastestButton: {
      cached_url: string;
    };
  };
};

export default function LatestBlogPost({ blok }: LatestBlogPostProps) {
  return (
    <div {...storyblokEditable(blok)}>
      {/* Your latest blog post content here */}
      <div className="p-4">
        Latest Blog Post Component
      </div>
    </div>
  );
}
