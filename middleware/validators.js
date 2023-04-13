const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const ErrorBadRequest = require('./ErrorBadRequest');

const validateUrl = (url) => {
  if (validator.isURL(url)) {
    return url;
  }
  throw new ErrorBadRequest('Bad URL.');
};

const validateUpdateUser = celebrate({
  params: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
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
    year: Joi.string().required().min(1).max(4),
    description: Joi.string().required().min(1),
    image: Joi.string().required().custom(validateUrl),
    trailerLink: Joi.string().required().custom(validateUrl),
    thumbnail: Joi.string().required().custom(validateUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  validateUrl, validateUpdateUser, validateGetMovie, validateCreateMovie,
};
