import slides from './slides';

export default () => {
  document.body.innerHTML = `
    <div class='print'>
      ${slides.map(slide => slide.note ? slide.note : 'No note').join('<hr>')}
    </div>
  `;
};
