import _ from 'lodash';
import type { Product, ParserInput } from '../types/general';

export const extractPrice = (input: string): number =>
  parseFloat(input.replace(/[^\d\.]*/g, ''));

export const computeProductList = (input: ParserInput): Product[] => {
  const result = [];
  for (let i = 0; i < input.title.length; i++) {
    const item = {};
    Object.entries(input).forEach(([key]) => {
      item[key] = input[key][i];
      /**
       * To separate price to discount, Save word is being used.
       * To calculate Yearly price logic bellow is used, Only yearly subscription have discounts
       * Products with no discount are monthly prices. To get Yearly price we multiply them with 12 months
       * Later on they are sorted desc by annualPrice.
       */
      if (key === 'price' && input[key][i].includes('Save')) {
        const pieces = input[key][i].split('Save');
        item['discount'] = `£${extractPrice(pieces[1])}`;
        item['annualPrice'] = extractPrice(pieces[0]);
        item['price'] = `£${item['annualPrice']}`;
      } else {
        item['discount'] = '';
        item['annualPrice'] = extractPrice(input[key][i]) * 12;
        item['price'] = `£${extractPrice(input[key][i])}`;
      }
    });
    result.push(item);
  }
  return _.orderBy(result, 'annualPrice', 'desc').map((item) => ({
    title: item.title,
    description: item.description,
    price: item.price,
    discount: item.discount,
  }));
};
