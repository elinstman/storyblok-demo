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
  Route as RouteComponent
} from "react-router-dom";
import { useEffect, useState } from "react";
import { flatRoutes } from "@react-router/fs-routes";


import { storyblokInit, apiPlugin } from "@storyblok/react";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { StoryblokCMS } from "./utils/cms";
import type { ReactNode } from "react";
import { StoryblokProvider as CustomStoryblokProvider } from "./components/storyblokProvider";
import Page from "./components/Page";
import Teaser from "./components/Teaser";
import Grid from "./components/Grid";
import Feature from "./components/Feature";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConfigLayout from "./routes/layout";
import routes from "./routes";
import type { RouteConfigEntry } from "@react-router/dev/routes";


const components = {
  page: Page,
  teaser: Teaser,
  grid: Grid,
  feature: Feature,
  header: Header,
  footer: Footer,
  config: Layout,
}

storyblokInit({
  accessToken: "AINhSPX7irFQVFrjyhGXFAtt",
  use: [apiPlugin],
  components,
})

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
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
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
