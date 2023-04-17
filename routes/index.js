const router = require('express').Router();
const ErrorNotFound = require('../middleware/ErrorNotFound');
const { writeErrorLog } = require('../middleware/logging');
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { errMsgs } = require('../config/config');

router.use('/', authRoutes);

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

router.use('*', (req, res, next) => {
  writeErrorLog(req, 'Unknown route invoked.');
  const errorNotFound = new ErrorNotFound(errMsgs.badRoute);
  next(errorNotFound);
});

module.exports = router;
