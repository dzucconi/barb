import * as url from '../lib/url';

export default slide => slide.title ? `
  <div
    class='caption ${slide.persist ? 'caption--persist' : ''} ${slide.video ? 'caption--video' : ''}'>
    <div class='caption__title'>
      ${slide.title}
      ${slide.year ? `(${slide.year})` : ''}
    </div>

    ${slide.material ? `
      <div class='caption__material'>
        ${slide.material}
      </div>
    ` : ''}

    ${slide.dimensions ? `
      <div class='caption__dimensions'>
        ${slide.dimensions}
      </div>
    ` : ''}

    ${slide.url ? `
      <div class='caption__url'>
        <a href='${slide.url}' target='_blank'>
          ${url.clean(slide.url)}
        </a>
      </div>
    ` : ''}
  </div>
` : '';
