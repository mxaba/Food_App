"use strict";

var bcrypt = require('bcrypt');

var hash = function hash(str) {
  return bcrypt.hashSync(str, bcrypt.genSaltSync(10));
};

var compare = function compare(password, hash) {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  hash: hash,
  compare: compare
};
//# sourceMappingURL=bcrypt.js.map