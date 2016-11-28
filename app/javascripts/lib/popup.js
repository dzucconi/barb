import _ from 'lodash';

const options = obj =>
  _.map(obj, (v, k) => `${k}=${v}`).join(',');

export default page =>
  window.open(`/#!/${page}`, page, options({
    left: 0,
    top: 0,
    width: 600,
    height: 400,
  }));
