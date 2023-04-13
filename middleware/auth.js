const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('./ErrorUnauthorized');

const { JWT_SECRET } = require('../config/config');

const tokenCheck = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      console.log('tokenCheck: token not found');
      next(new ErrorUnauthorized('Bad Token.'));
      return;
    }

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = tokenCheck;
