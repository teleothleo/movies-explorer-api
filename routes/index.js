const router = require('express').Router();
const tokenCheck = require('../middleware/auth');
const ErrorNotFound = require('../middleware/ErrorNotFound');
const { writeErrorLog } = require('../middleware/logging');
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

router.use('/', authRoutes);

router.patch('/404', (req, res, next) => {
  writeErrorLog(req, '/404 route invoked.');
  next(new ErrorNotFound('Lost your way?'));
});

router.use(tokenCheck);

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

router.use('*', (req, res, next) => {
  writeErrorLog(req, 'Unknown route invoked.');
  const errorNotFound = new ErrorNotFound('Lost your way?');
  next(errorNotFound);
});

module.exports = router;
