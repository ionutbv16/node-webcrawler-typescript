import { extractPrice, computeProductList } from './scrapperUtils'

test('Test extractPrice method', () => {
  const price = extractPrice('abc123.9op');
  expect(price).toBe(123.9);
});

test('Test computeProductList method', () => {
  const input = {
    title: [
      'Basic: 500MB Data - 12 Months',
      'Standard: 1GB Data - 12 Months',
      'Optimum: 2 GB Data - 12 Months',
      'Basic: 6GB Data - 1 Year',
      'Standard: 12GB Data - 1 Year',
      'Optimum: 24GB Data - 1 Year',
    ],
    description: [
      'Up to 500MB of data per monthincluding 20 SMS(5p / MB data and 4p / SMS thereafter)',
      'Up to 1 GB data per monthincluding 35 SMS(5p / MB data and 4p / SMS thereafter)',
      '2GB data per monthincluding 40 SMS(5p / minute and 4p / SMS thereafter)',
      'Up to 6GB of data per yearincluding 240 SMS(5p / MB data and 4p / SMS thereafter)',
      'Up to 12GB of data per year including 420 SMS(5p / MB data and 4p / SMS thereafter)',
      'Up to 12GB of data per year including 480 SMS(5p / MB data and 4p / SMS thereafter)',
    ],
    price: [
      '£5.99 ',
      '£9.99 ',
      '£15.99 ',
      '£66.00 Save £5.86 on the monthly price',
      '£108.00 Save £11.90 on the monthly price',
      '£174.00 Save £17.90 on the monthly price',
    ],
  };
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
      description: 'Up to 12GB of data per year including 480 SMS(5p / MB data and 4p / SMS thereafter)',
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
  const products = computeProductList(input);
  expect(products).toEqual(result);
});
