const express = require('express')
const usersController = require('../controllers/user.controller')

const router = express.Router();

router.get('/', usersController.index);
router.post('/', usersController.save);
router.get('/:id', usersController.read);
router.put('/:id', usersController.update);

module.exports = router;