import Decimal from 'decimal.js';

const getNumber = function(num) {
  return new Decimal(+num);
};

export default {
  getNumber,
};
