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
  slug: string;  
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
  title?: string;
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

  const articleSlug = storyData.slug;
  console.log('articleSlug:', articleSlug);
  
  const articleTitle = articleWrapper?.article?.[0]?.title;
 

  const articleContent = articleWrapper?.article?.[0]?.content;
  // console.log('articleContent:', articleContent);  
  const firstImage = articleContent?.find(block => block.component === 'imageBlock');


  return (
    <div {...storyblokEditable(blok)} className="aspect-square w-full p-4 max-w-[400px] mx-auto">
      <div className="bg-white rounded h-full w-full relative">
        {firstImage && (
          <img 
            src={firstImage.image.filename} 
            alt={firstImage.image.alt || storyData.name}
            className="absolute inset-0 w-full h-full object-cover rounded"
          />
        )}
        <div className="absolute inset-0 bg-black/30 rounded" />
        <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-2">
          <h2 className="text-2xl font-thin text-white line-clamp-2">
            {articleTitle}
          </h2>
          <button className="w-fit overflow-hidden text-xs px-4 py-1 border-2 border-white text-black group bg-white hover:bg-transparent hover:text-white duration-300 ease-in-out transform scale-x-100 group-hover:scale-x-100 origin-left">
              <a href={`/kundservice/blog/${articleSlug.split('/').pop()}`}>
              Läs mer
            </a>
            
          </button>
        </div>
      </div>
    </div>
  );
}
