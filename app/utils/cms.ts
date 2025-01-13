import { getStoryblokApi } from "@storyblok/react";

type StoryParams = {
    slug?: string[];
  };
  
  type MetaData = {
    title: string;
    description: string;
  };

export class StoryblokCMS {
    static IS_PROD: boolean = import.meta.env.MODE === "production";
    static IS_DEV: boolean = import.meta.env.MODE === "development";
     static VERSION: string = this.IS_PROD ? "published" : "draft";
    // static TOKEN: string | undefined = import.meta.env.VITE_STORYBLOK_PREVIEW_ACCESS_TOKEN;
    static TOKEN: string = "AINhSPX7irFQVFrjyhGXFAtt";

    static async sbGet(path: string, params?: Record<string, any>): Promise<any> {
        console.log("path in sbGet", path);
        console.log("params in sbGet", params);
        return getStoryblokApi().get(path, params);
      }

    

  static async getStory(params: StoryParams): Promise<any> {
    if (!params) return {};
    const uri = params?.slug?.join("/");
    const storyUrl = "cdn/stories/" + uri;


    const defaultParams = this.getDefaultSBParams();  
    const { data } = await this.sbGet(storyUrl, defaultParams);
    console.log("data i getStory", data);
    return data.story;
  }
  static getDefaultSBParams(): Record<string, any> {
    return {
      version: this.VERSION,
      resolve_links: "url",
      cv: Date.now(),
    };
  }

  static async getConfig(): Promise<Record<string, any>> {
    try {
      const { data } = await this.sbGet("cdn/stories/config", this.getDefaultSBParams());
      return data?.story?.content || {};
    } catch (error) {
      console.error("CONFIG ERROR", error);
      return {}
    }
  }

  static async generateMetaFromStory(slug: string): Promise<MetaData> {
    // Anpassa efter dina SEO-fält
    return {
      title: "Title",
      description: "Description",
    };
  }

  static async getStaticPaths(): Promise<{ slug: string[] }[]> {
    try {
      const sbParams = {
        version: this.VERSION,
      };

      const { data } = await this.sbGet("cdn/links/", sbParams);
      const paths: { slug: string[] }[] = [];

      Object.keys(data.links).forEach((linkKey) => {
        const link = data.links[linkKey];
        if (link.is_folder || link.slug === "home") {
          return;
        }
        const slug = link.slug === "home" ? [] : link.slug;

        if (slug !== "") {
          paths.push({
            slug: slug.split("/"),
          });
        }
      });

      return paths;
    } catch (error) {
      console.error("PATHS ERROR", error);
      return [];
    }
  }
}