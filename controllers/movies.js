const ErrorBadRequest = require('../middleware/ErrorBadRequest');
const ErrorNotFound = require('../middleware/ErrorNotFound');
const ErrorForbidden = require('../middleware/ErrorForbidden');
const Movie = require('../models/movie');
const { errMsgs, resMsg } = require('../config/config');

const getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    });
    console.log('createMovie: ', movie);
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log(err);
      next(new ErrorBadRequest(errMsgs.badData));
    } else {
      next(err);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movieId = await Movie.findById(req.params._id);
    console.log('deleteMovie: ', movieId);
    if (!movieId) {
      next(new ErrorNotFound(errMsgs.movNotFound));
      return;
    }
    if (movieId.owner.toString() !== req.user._id) {
      next(new ErrorForbidden(errMsgs.noRightsMovRm));
      return;
    }

    try {
      const result = await Movie.deleteOne({ _id: movieId });
      console.log(result);
      res.send({ message: resMsg.movRmSuccess });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ErrorBadRequest(errMsgs.badId));
      return;
    }
    next(error);
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
