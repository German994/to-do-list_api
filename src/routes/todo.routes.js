const express = require('express')

const {
  getTodosController,
  getTodoByIdController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
} = require('../controllers/todo.controller')

const router = express.Router()

router.get('', getTodosController)
router.get('/:id', getTodoByIdController)
router.post('', createTodoController)
router.patch('/:id', updateTodoController)
router.delete('/:id', deleteTodoController)

module.exports = {
  todosRouter: router,
}
