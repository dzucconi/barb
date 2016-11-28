import Emitter from 'eventemitter2';
import slides from './slides';

export const STATE = {
  cursor: 0,
};

const events = new Emitter;

export const VEP = window.VEP = {
  events,

  state: STATE,

  next: () => {
    STATE.cursor = (STATE.cursor + 1) <= (slides.length - 1) ? STATE.cursor + 1 : 0;
    events.emit('next', STATE.cursor);
  },

  prev: () => {
    STATE.cursor = STATE.cursor - 1 >= 0 ? STATE.cursor - 1 : (slides.length - 1);
    events.emit('prev', STATE.cursor);
  },

  launch: () => {
    events.emit('launch');
  },

  refresh: () => {
    events.emit('refresh');
  },

  bind: fn => {
    if (STATE.isBound) return;

    window.onkeyup = e => {
      switch (e.keyCode) {
      case 37:
        VEP.prev();
        break;
      case 39:
        VEP.next();
        break;
      case 82:
        VEP.refresh();
        break;
      default:
        break;
      }
    };

    fn();

    STATE.isBound = true;
  },
};
