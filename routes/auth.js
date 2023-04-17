const router = require('express').Router();
const { errMsgs } = require('../config/config');
const { signIn, signUp, signOut } = require('../controllers/auth');
const tokenCheck = require('../middleware/auth');
const ErrorNotFound = require('../middleware/ErrorNotFound');
const { writeErrorLog } = require('../middleware/logging');
const { validateSignUp, validateSignIn } = require('../middleware/validators');

router.post('/signup', validateSignUp, signUp);
router.post('/signin', validateSignIn, signIn);

router.patch('/404', (req, res, next) => {
  writeErrorLog(req, '/404 route invoked.');
  next(new ErrorNotFound(errMsgs.badRoute));
});

router.use(tokenCheck);

router.post('/signout', signOut);

module.exports = router;
