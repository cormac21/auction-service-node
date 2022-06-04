const express = require('express')
const usersController = require('../controllers/user.controller')
const checkAuthMiddleware = require('../middleware/auth-check')

const router = express.Router();

router.get('/', usersController.index);
router.post('/', usersController.save);
router.get('/:id', usersController.read);
router.put('/:id', checkAuthMiddleware.checkAuth, usersController.update);
router.delete('/:id', checkAuthMiddleware.checkAuth, usersController.destroy);
router.post('/login', usersController.login);

module.exports = router;