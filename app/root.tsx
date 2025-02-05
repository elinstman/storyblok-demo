import "./app.css";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  RouterProvider,
  Scripts,
  ScrollRestoration,
  createBrowserRouter,
  createRoutesFromElements,
  Route as RouteComponent,
  useLoaderData
} from "react-router-dom";



import { storyblokInit, apiPlugin } from "@storyblok/react";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { StoryblokCMS } from "./utils/cms";
import type { ReactNode } from "react";
import { StoryblokProvider as CustomStoryblokProvider } from "./components/storyblokProvider";
import Page from "./components/pages/Page";
import Teaser from "./components/common/Teaser";
import Grid from "./components/common/Grid";
import Feature from "./components/common/Feature";
import Header from "./components/globalLayout/Header";
import Footer from "./components/globalLayout/Footer";
import SectionHeader from "./components/common/HeaderSection";
import ProductCard from "./components/nestable/ProductCard";
import DividerTextSection from "./components/common/dividerTextSection";
import Product from "./components/common/Product";
import ProductImages from "./components/nestable/productImages";
import ProductInfoWrapper from "./components/nestable/ProductInfoWrapper";
import Posts from "./components/common/Posts";
import ArticleHero from "./components/nestable/article/ArticleHero";
import ArticleWrapper from "./components/nestable/article/ArticleWrapper";
import ArticleContent from "./components/nestable/article/ArticleContent";
import ImageBlock from "./components/nestable/ImageBlock";
import ArticleText from "./components/nestable/article/ArticleText";
import HeroNav from "./components/nestable/HeroNav";
import ArticleFeature from "./components/nestable/article/ArticleFeature";
import LatestBlogPost from "./components/nestable/article/LatestBlogPost";
import latestArticleGrid from "./components/nestable/article/LatestArticlesGrid";
import NewsPage from "./components/pages/NewsPage";

const components = {
  page: Page,
  teaser: Teaser,
  grid: Grid,
  feature: Feature,
  header: Header,
  footer: Footer,
  sectionHeader: SectionHeader,
  productCard: ProductCard,
  dividerTextSection: DividerTextSection,
  product: Product,
  productImages: ProductImages,
  productInfoWrapper: ProductInfoWrapper,
  posts: Posts,
  articleHero: ArticleHero,
  articleWrapper: ArticleWrapper,
  articleContent: ArticleContent,
  imageBlock: ImageBlock,
  articleText: ArticleText, 
  heroNav: HeroNav,
  articleFeature: ArticleFeature, 
  latestBlogPost: LatestBlogPost,
  latestArticleGrid: latestArticleGrid,
  newsPage: NewsPage,
}

storyblokInit({
  accessToken: "AINhSPX7irFQVFrjyhGXFAtt",
  use: [apiPlugin],
  components,
})

export async function loader() {
  try {
    const config = await StoryblokCMS.getConfig();
    if (!config) {
      throw new Response("Config not found", { status: 404 });
    }
    return { config };
  } catch (error) {
    console.error("Error fetching config:", error);
    throw new Response("Failed to fetch config", { status: 500 });
  }
}

export function StoryblokProvider({ children }: { children: ReactNode }) {
    return (
      children
    );
  }

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { config } = useLoaderData<typeof loader>();
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header blok={config.content} />
        {children}
        <Footer blok={config.content} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const storyblok = new StoryblokCMS();
  
  return (
    <CustomStoryblokProvider storyblok={storyblok}>
      <Outlet />
    </CustomStoryblokProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
