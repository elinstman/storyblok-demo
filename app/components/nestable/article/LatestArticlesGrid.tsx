import { storyblokEditable } from "@storyblok/react";
import ArticleFeature from "./ArticleFeature";
import { StoryblokCMS } from "~/utils/cms";

type StoryblokArticle = {
  uuid: string;
  full_slug: string;
};

type LatestArticlesGridProps = {
  blok: {
    _uid: string;
    component: string;
    numberOfArticles?: number; 
  };
};

export default async function latestArticleGrid({ blok }: LatestArticlesGridProps) {
  const articles = await StoryblokCMS.getStories({
    starts_with: 'kundservice/blog/',
    sort_by: 'first_published_at:desc',
    per_page: blok.numberOfArticles || 4


  });

  return (
    <section {...storyblokEditable(blok)}>
      <ul className="grid md:grid-cols-4 gap-4 container mx-auto">
        {articles.stories.map((article: StoryblokArticle) => (
          <li key={article.uuid} className="w-full">
            <a href={`/kundservice/blog/${article.full_slug.split('/').pop()}`} className="block">
              <ArticleFeature 
                blok={{
                  _uid: article.uuid,
                  article: article.uuid,
                  component: 'articleFeature',
                  sort_by_date: 'desc'
                }} 
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
} 