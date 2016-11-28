export const clean = url => {
  url = url.replace(/(http|https):\/\//, '');
  url = url.replace(/\/$/, '');
  return url;
};
