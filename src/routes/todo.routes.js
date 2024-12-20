import express from 'express'

import {
  getAllTodosController,
  getTodosController,
  getTodoByIdController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
} from '../controllers/todo.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/all', authenticateToken, getAllTodosController)
router.get('', authenticateToken, getTodosController)
router.get('/:id', authenticateToken, getTodoByIdController)
router.post('', authenticateToken, createTodoController)
router.patch('/:id', authenticateToken, updateTodoController)
router.delete('/:id', authenticateToken, deleteTodoController)

export const todosRouter = router
