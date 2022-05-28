import forIn from 'lodash/forIn';
import merge from 'lodash/merge';

const clearNullParams = function (params) {
  const mParams = merge({}, params);
  forIn(params, (val, key) => {
    if (params[key] === null || params[key] === '') {
      delete mParams[key];
    }
  });
  return mParams;
};

export default {
  clearNullParams,
};
