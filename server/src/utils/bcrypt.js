const bcrypt = require('bcrypt');

const hash = (str) => {
    return bcrypt.hashSync(str, bcrypt.genSaltSync(10));
};

const compare = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports = { hash, compare };