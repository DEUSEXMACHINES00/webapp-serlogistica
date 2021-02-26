'use strict'
var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user');

router.post('/ingresar', UserController.getUser);
router.get('/consultar_usuarios', UserController.consultar_usuarios);


module.exports = router;

