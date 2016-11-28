import _ from 'lodash';

const evaluate = x => {
  if (_.isFunction(x)) return x();
  return x;
};

export default data => {
  return JSON.stringify(_.transform(data, (result, value, key) => {
    result[key] = evaluate(value);
    return result;
  }), undefined, 2);
};
