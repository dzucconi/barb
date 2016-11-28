import * as cards from './cards';

const examples = [
  {
    text: () => 'Goodbye world.',
    note: 'This is a note.',
  },

  cards.image('https://atlas-production.s3.amazonaws.com/7709/6cee74a22b4cdf000819aab8195ac5de068d626aa3a158fa8401818ed385b335.jpg', {
    title: 'An image',
  }),
];

const slides = [
  ...examples,
];

export default slides;
