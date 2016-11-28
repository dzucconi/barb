import page from 'page';
import slides from './slides';
import caption from './templates/caption';
import { VEP, STATE } from './runner';

const progress = state =>
  `${((state.cursor + 1) / slides.length) * 100}%`;

export const render = (slide, state) => document.body.innerHTML = `
  <div class='progress' style='width: ${progress(state)};'></div>

  <div class='handle'></div>

  <div class='show'>
    <div
      class='slide'
      style='${slide.cover ? `background-image: url(${slide.cover.src});` : ''}'>

      ${slide.video ?  `
        <video width='100%' height='100%' controls>
          <source src='${slide.video.src}' type='${slide.video.type}'>
        </video>
      ` : ''}

      ${slide.url ? `
        <iframe id='iframe' class='iframe' src='${slide.url}'></iframe>
      ` : ''}

      ${slide.image ? `
        <div class='image'>
          <div class='image__display'>
            <img class='image__img' src='${slide.image.src}'>
          </div>
        </div>
      ` : ''}

      ${slide.text ? `
        <div class='text'>
          <div class='text__message'>
            ${slide.text()}
          </div>
        </div>
      ` : ''}

      ${caption(slide)}
    </div>
  </div>
`;

export default ctx => {
  if (ctx.path.indexOf('standalone') !== -1) {
    // Manages its own state
    STATE.cursor = parseInt(ctx.params.cursor) || 0;

    const navigate = cursor =>
      page(`/standalone/${cursor}`);

    const refresh = () =>
      render(slides[STATE.cursor], STATE);

    VEP.bind(() => {
      VEP.events.on('next', navigate);
      VEP.events.on('prev', navigate);
      VEP.events.on('refresh', refresh);
    });

    refresh();

    return;
  }

  window.addEventListener('message', e => {
    // State is passed in on every message
    const state = JSON.parse(e.data);

    render(slides[state.cursor], state);
  }, false);
};
