const express = require('express')
const router = express.Router()
const controller = require('../controller/todoController.js')

router.get('/:token', controller.findAll)

router.post('/insert', controller.insert)

router.put('/update/:id', controller.update)

router.delete('/delete/:id', controller.delete)

module.exports = router
