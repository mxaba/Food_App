"use strict";

var _require = require('dotenv'),
    config = _require.config;

config();
var secret = process.env.JWT_SECRET;
module.exports = secret;
//# sourceMappingURL=jwt_secret.js.map