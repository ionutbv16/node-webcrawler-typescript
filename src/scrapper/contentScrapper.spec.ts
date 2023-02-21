import fs from 'fs';

import { SELECTORS } from '../config/config';
import { contentScrapper } from './contentScrapper';

/**
 * contentScrapper method is being tested using a local HTML static file
 */

const example = (fs.readFileSync(
  `${__dirname}/test/testPage.html`
) as unknown) as string;

describe('Test contentScrapper with local HTML File', () => {
  it('should parse the title', () => {
    const parsed = contentScrapper(example, SELECTORS);
    const result = [
      {
        title: 'Optimum: 2 GB Data - 12 Months',
        description:
          '2GB data per monthincluding 40 SMS(5p / minute and 4p / SMS thereafter)',
        price: '£15.99',
        discount: '',
      },
      {
        title: 'Optimum: 24GB Data - 1 Year',
        description:
          'Up to 12GB of data per year including 480 SMS(5p / MB data and 4p / SMS thereafter)',
        price: '£174',
        discount: '£17.9',
      },
      {
        title: 'Standard: 1GB Data - 12 Months',
        description:
          'Up to 1 GB data per monthincluding 35 SMS(5p / MB data and 4p / SMS thereafter)',
        price: '£9.99',
        discount: '',
      },
      {
        title: 'Standard: 12GB Data - 1 Year',
        description:
          'Up to 12GB of data per year including 420 SMS(5p / MB data and 4p / SMS thereafter)',
        price: '£108',
        discount: '£11.9',
      },
      {
        title: 'Basic: 500MB Data - 12 Months',
        description:
          'Up to 500MB of data per monthincluding 20 SMS(5p / MB data and 4p / SMS thereafter)',
        price: '£5.99',
        discount: '',
      },
      {
        title: 'Basic: 6GB Data - 1 Year',
        description:
          'Up to 6GB of data per yearincluding 240 SMS(5p / MB data and 4p / SMS thereafter)',
        price: '£66',
        discount: '£5.86',
      },
    ];

    expect(parsed).toEqual(result);
  });
});
