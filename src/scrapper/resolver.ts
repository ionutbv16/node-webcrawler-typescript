import type { Selectors } from '../types/general';

export const resolver = (loader, contentScrapper) => {
  return {
    /**
     * Resolver is the part that connects LOADER to contentScrapper
     * Any other Scrapper or Loader  can be used by having these components separate:
     * contentScrapper, Resolver and Loader
     */
    resolve: async (source: string, selectors: Selectors) => {
      const scrap = { error: null, data: null };
      const content = await loader(source);
      if (typeof content === 'string') {
        scrap.data = await contentScrapper(content, selectors);
      } else {
        scrap.error = 'The content is not a string';
      }
      return scrap;
    },
  };
};
