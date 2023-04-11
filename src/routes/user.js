const express = require('express');
const router = express.Router()

const userController = require('../controllers/user.controller');

router.get('/read', userController.getUser)
router.post('/add', userController.addUser)
router.get('/search', userController.searchUser)
router.put('/edit/:id', userController.editInfo)
router.delete('/edit/:id', userController.deleteUser)

module.exports = router
