import request from 'request-promise';

export const dataLoader = async (source: string): Promise<any> => {
  /**
   * Loader is the part to Load/Fetch Data
   * Any other Scrapper or Loader  can be used by having these components separate:
   * contentScrapper, Resolver and Loader
   */
  try {
    return await request.get(source);
  } catch (ex) {
    console.log(ex);
    return ex;
  }
};
