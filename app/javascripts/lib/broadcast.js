export default (ctx, payload) => {
  ctx.postMessage(JSON.stringify(payload), window.location);
};
