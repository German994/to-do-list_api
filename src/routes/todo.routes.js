const express = require('express')

const {
  getTodosController,
  getTodoByIdController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
} = require('../controllers/todo.controller')

const router = express.Router()
const { protected } = require('../middleware/auth.middleware')

router.get('', protected, getTodosController)
router.get('/:id', protected, getTodoByIdController)
router.post('', protected, createTodoController)
router.patch('/:id', protected, updateTodoController)
router.delete('/:id', protected, deleteTodoController)

module.exports = {
  todosRouter: router,
}
