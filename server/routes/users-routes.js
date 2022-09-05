const express = require('express');
// const {check} = require('express-validator');

const usersController = require('../controllers/users-controller');
// const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', usersController.getData);

router.post('/', usersController.addUser);

router.post('/login', usersController.login);

module.exports = router;