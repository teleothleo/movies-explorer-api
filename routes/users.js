const router = require('express').Router();
const { getMe, updateUser } = require('../controllers/users');
const { validateUpdateUser } = require('../middleware/validators');

router.get('/me', getMe);
router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
