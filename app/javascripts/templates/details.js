import * as url from '../lib/url';

export default slide => `
  <div>${slide.title} (${slide.year})</div>
  ${slide.material ? `<div>${slide.material}</div>` : ''}
  ${slide.dimensions ? `<div>${slide.dimensions}</div>` : ''}
  ${slide.url ? `<div>${url.clean(slide.url)}</div>` : ''}
`;
