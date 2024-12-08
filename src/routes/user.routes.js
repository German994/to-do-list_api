const express = require('express')

const {
  getUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
} = require('../controllers/user.controller')

const router = express.Router()

router.get('', getUsersController)
router.get('/:id', getUserByIdController)
router.post('', createUserController)
router.patch('/:id', updateUserController)
router.delete('/:id', deleteUserController)

module.exports = {
  usersRouter: router,
}
