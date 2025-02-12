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
        const storyblokApi = getStoryblokApi();
        
        try {
            const response = await storyblokApi.get(path, params);
            return response;
        } catch (error) {
            console.error('sbGet error:', error);
            throw error;
        }
    }

    
// Get story by slug
  static async getStory(params: StoryParams): Promise<any> {
    if (!params.slug) return {};
    
    // Don't join the slug if it's already a string
    const uri = typeof params.slug === 'string' 
      ? params.slug 
      : params.slug.join("/");
      
    const storyUrl = "cdn/stories/" + uri;
    // console.log('Requesting Storyblok URL:', storyUrl);
    // console.log('With params:', params);

    try {
      const defaultParams = this.getDefaultSBParams();  
      const { data } = await this.sbGet(storyUrl, defaultParams);
      return data.story;
    } catch (error) {
      console.error('getStory error:', error);
      console.error('Failed URL:', storyUrl);
      throw error;
    }
  }
  
  static getDefaultSBParams(): Record<string, any> {
    return {
      version: this.VERSION,
      resolve_links: "url",
      cv: Date.now(),
    };
  }
// Get global config, header, footer, etc.
  static async getConfig(): Promise<Record<string, any>> {
    try {
      const storyUrl = "cdn/stories/config";
      const defaultParams = this.getDefaultSBParams();
      
      const { data } = await this.sbGet(storyUrl, defaultParams);
      return data.story;  // Return the entire story object instead of just content
    } catch (error) {
      console.error("CONFIG ERROR", error);
      return {};
    }
  }

  static async generateMetaFromStory(slug: string): Promise<MetaData> {

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

  // Get story by UUID
  static async getStoryByUuid(uuid: string): Promise<any> {
    try {
        const storyQuery = {
            by_uuids: uuid,
            version: this.VERSION,
        };

        const { data } = await this.sbGet('cdn/stories', storyQuery);
        
        if (data.stories && data.stories.length > 0) {
            return data.stories[0];
        }
        return null;
    } catch (error) {
        console.error("Error fetching story by UUID:", error);
        throw error;
    }
  }

  static async getStories({ starts_with, sort_by, per_page }: {
    starts_with: string;
    sort_by: string;
    per_page: number;
  }): Promise<any> {
    try {
      const params = {
        ...this.getDefaultSBParams(),
        starts_with,
        sort_by,
        per_page,
      };

      const { data } = await this.sbGet('cdn/stories', params);
      return data;
    } catch (error) {
      console.error("Error fetching stories:", error);
      throw error;
    }
  }
}