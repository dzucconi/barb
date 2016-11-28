import details from './templates/details';

export const text = text => ({
  text: () => text,
});

export const title = slide =>
  Object.assign({}, text(details(slide)), {
    note: slide.note,
  });

export const iframe = slide => [
  title(slide),
  slide,
];

export const image = (src, slide = {}) =>
  Object.assign({}, slide, {
    image: { src }
  });

export const cover = (src, slide = {}) =>
  Object.assign({}, slide, {
    cover: { src }
  });

export const images = (images, slide = {}) => [
  title(slide),
  ...images.map(src => Object.assign({}, slide, {
    image: { src }
  })),
];
