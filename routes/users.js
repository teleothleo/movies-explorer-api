const router = require('express').Router();
const { getMe, updateUser } = require('../controllers/users');
const { validateUserData } = require('../middleware/validators');

router.get('/me', getMe);
// router.patch('/me', validateUserData, updateUser);
router.patch('/me', (req, res, next) => {
  console.log('Request body before validation:', req.body);
  next();
}, validateUserData, updateUser);

module.exports = router;
