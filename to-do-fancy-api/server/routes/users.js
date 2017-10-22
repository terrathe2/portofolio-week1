const express = require('express');
const router = express.Router();
const controller = require('../controller/userController')

/* GET users listing. */
router.get('/', controller.findAll)

router.post('/login', controller.login)

router.post('/fblogin', controller.fblogin)

router.post('/register', controller.register)

router.delete('/delete/:id', controller.delete)

module.exports = router;
