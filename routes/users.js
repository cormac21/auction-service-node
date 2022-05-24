const express = require('express')
const usersController = require('../controllers/user.controller')

const router = express.Router();

router.post('/', usersController.save);
router.get('/:id', usersController.read);

module.exports = router;