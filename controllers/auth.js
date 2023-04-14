const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, errMsgs, resMsg } = require('../config/config');

const ErrorConflict = require('../middleware/ErrorConflict');
const ErrorUnauthorized = require('../middleware/ErrorUnauthorized');
const ErrorBadRequest = require('../middleware/ErrorBadRequest');

const User = require('../models/user');

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest(errMsgs.badData));
        return;
      }
      if (err.code === 11000) {
        next(new ErrorConflict(errMsgs.conflictEmail));
        return;
      }
      next(err);
    });
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('signIn: ', req.body);
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new ErrorUnauthorized(errMsgs.badEmailPsw));
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      next(new ErrorUnauthorized(errMsgs.badEmailPsw));
      return;
    }
    console.log('jwtSecret: ', JWT_SECRET);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });
    res.cookie('token', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    });
    res.send({ token, user });
  } catch (error) {
    next(error);
  }
};

const signOut = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: resMsg.signOutSuccess });
};

module.exports = { signUp, signIn, signOut };
