import page from 'page';
import slides from './slides';
import prettify from './lib/prettify';
import broadcast from './lib/broadcast';
import popup from './lib/popup';
import { VEP, STATE } from './runner';
import * as preview from './show';

const render = slide => document.body.innerHTML = `
  <div class='notes'>
    <div class='notes__nav'>
      ${STATE.cursor + 1} of ${slides.length}
      —
      <a onclick='VEP.launch()'>
        ${VEP.viewer ? 'Reconnect' : 'Connect'}
      </a>
      —
      <a onclick='VEP.refresh()'>
        Refresh
      </a>
    </div>

    <div class='note'>
      ${slide.note ? slide.note : 'No note'}
    </div>

    <div class='preview'>
      ${preview.render(slide, STATE)}
    </div>

    <!-- <pre>STATE: ${prettify(STATE)}</pre> -->
    <!-- <pre>SLIDE: ${prettify(slide)}</pre> -->
  </div>
`;

export default ctx => {
  STATE.cursor = parseInt(ctx.params.cursor) || 0;

  const navigate = cursor => {
    if (VEP.viewer) broadcast(VEP.viewer, STATE);

    page(`/${cursor}`);

    render(slides[cursor]);
  };

  const refresh = () => {
    // render(slides[STATE.cursor]);
    broadcast(VEP.viewer, STATE);
  };

  VEP.bind(() => {
    VEP.events.on('next', navigate);
    VEP.events.on('prev', navigate);
    VEP.events.on('refresh', refresh);

    VEP.events.on('launch', () => {
      VEP.viewer = popup('show');
      setTimeout((() => broadcast(VEP.viewer, STATE)), 250);
      render(slides[STATE.cursor]);
    });
  });

  render(slides[STATE.cursor]);
};
