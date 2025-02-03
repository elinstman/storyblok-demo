import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { useState } from "react";
import { StoryblokCMS } from "~/utils/cms";

type ArticleFeatureProps = {
  blok: {
    _uid: string;
    article: string;
    component: string;
    _editable?: string;
    sort_by_date: string;
  };
};

type StoryData = {
  content: {
    postBlock: PostBlock[];
  };
  name: string;
};

type PostBlock = {
  _uid: string;
  component: string;
  article?: ArticleBlock[];
  articleImage?: {
    filename: string;
  };
};

type ArticleBlock = {
  _uid: string;
  component: string;
  filename?: string;
  content: imageBlock[];
};

type imageBlock = {
  _uid: string;
  component: string;
  filename: string;
  image: {
    filename: string;
    alt?: string;
  };
};

export default async function ArticleFeature({ blok }: ArticleFeatureProps) {
  const storyData: StoryData = await StoryblokCMS.getStoryByUuid(blok.article);

  const articleWrapper = storyData.content.postBlock?.find(
    block => block.component === 'articleWrapper'
  );

  const articleContent = articleWrapper?.article?.[0]?.content;
  const firstImage = articleContent?.find(block => block.component === 'imageBlock');

  return (
    <div {...storyblokEditable(blok)} className="aspect-square w-full p-4 max-w-[400px] mx-auto">
      <div className="bg-white rounded h-full w-full relative min-h-0">
        {firstImage && (
          <img 
            src={firstImage.image.filename} 
            alt={firstImage.image.alt || storyData.name}
            className="w-full h-full object-cover rounded"
          />
        )}
        <div className="absolute inset-0 bg-black/30 rounded items-start" />
        <h2 className="absolute inset-x-0 bottom-4 text-2xl font-thin px-4 text-white line-clamp-2">
          {storyData.name}
        </h2>
        
      </div>
    </div>
  );
}
