const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { errMsgs } = require('../config/config');
const ErrorBadRequest = require('./ErrorBadRequest');

const validateUrl = (url) => {
  if (validator.isURL(url)) {
    return url;
  }
  throw new ErrorBadRequest(errMsgs.badUrl);
};

const validateUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
});

const validateGetMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateUrl),
    trailerLink: Joi.string().required().custom(validateUrl),
    thumbnail: Joi.string().required().custom(validateUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  validateUrl,
  validateUserData,
  validateSignUp,
  validateSignIn,
  validateGetMovie,
  validateCreateMovie,
};
