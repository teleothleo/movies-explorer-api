const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateGetMovie, validateCreateMovie } = require('../middleware/validators');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:_id', validateGetMovie, deleteMovie);

module.exports = router;
