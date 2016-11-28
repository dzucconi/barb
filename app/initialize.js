import page from 'page';

import show from './javascripts/show';
import notes from './javascripts/notes';
import print from './javascripts/print';

document.addEventListener('DOMContentLoaded', () => {
  page('/print', print);
  page('/standalone', show);
  page('/standalone/:cursor', show);
  page('/show', show);
  page('/', notes);
  page('/:cursor', notes);

  page({
    hashbang: true,
  });
});
