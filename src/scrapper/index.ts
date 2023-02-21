import { DATA_SOURCE, SELECTORS } from '../config/config';
import { contentScrapper } from './contentScrapper';
import { dataLoader } from './loader';
import { resolver } from './resolver';
/**
 * contentScrapper is the part Where actual Scrapping is happening with cheerio library
 *  Any other Scrapper or Loader can be used by having these components separate:
 * contentScrapper, Resolver and Loader
 */
export const startScrapper = async (): Promise<any> => {
  await resolver(dataLoader, contentScrapper).resolve(DATA_SOURCE, SELECTORS);
};
