import { load } from 'cheerio';
import type { ParserInput, Selectors } from '../types/general';
import { computeProductList } from '../utils/scrapperUtils';

export const contentScrapper = (content: string, selectors: Selectors) => {
  /**
   * contentScrapper is the part Where actual Scrapping is happening with cheerio library
   *  Any other Scrapper or Loader can be used by having these components separate:
   * contentScrapper, Resolver and Loader
   */
  const $ = load(content);
  const results = {};

  Object.entries(selectors).forEach(([key, value]) => {
    const result = [];
    $(value).each((i, element) => {
      const text = $(element).text();
      if (key === 'price') {
        let price = '';
        let discount = '';
        $(element).find('span').each((_index, elementSpan) => {
            price = $(elementSpan).text();
          });
        $(element).find('p').each((_index, elementP) => {
            discount = $(elementP).text();
          });
        result.push(`${price} ${discount}`);
      } else {
        result.push(text);
      }
    });
    results[key] = result;
  });
  /**
   * This is the print console logic to meet business requirement
   * Data from contentScrapper is being send to computeProductList to get a proper Array Format.
   */
  console.log('Products:', computeProductList(results as ParserInput));
  return computeProductList(results as ParserInput);
};
