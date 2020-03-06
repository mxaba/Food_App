var db = require('../models/index');

const fetchUser = (userId, next) => {
  db.User.findOne({
    where: {
      id: userId,
    },
  }).then(user => next(user));
};

module.exports = fetchUser;

