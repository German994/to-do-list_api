import express from 'express'

import {
  getUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/user.controller.js'

const router = express.Router()

router.get('', getUsersController)
router.get('/:id', getUserByIdController)
router.post('', createUserController)
router.patch('/:id', updateUserController)
router.delete('/:id', deleteUserController)

export const usersRouter = router
