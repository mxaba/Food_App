var jwt = require('jsonwebtoken');

const jwtSigner = ({ id }) => jwt.sign({ id }, process.env.SECRET);

module.exports = jwtSigner;
