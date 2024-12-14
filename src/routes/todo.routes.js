import express from 'express'

import {
  getAllTodosController,
  getTodosController,
  getTodoByIdController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
} from '../controllers/todo.controller.js'

import { authMiddleware } from '../middleware/auth.middleware.js'
const router = express.Router()

router.get('/all', authMiddleware, getAllTodosController)
router.get('', authMiddleware, getTodosController)
router.get('/:id', authMiddleware, getTodoByIdController)
router.post('', authMiddleware, createTodoController)
router.patch('/:id', authMiddleware, updateTodoController)
router.delete('/:id', authMiddleware, deleteTodoController)

export const todosRouter = router
