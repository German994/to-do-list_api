const Todo = require('../models/todo.model')

// Obtener todos
const getTodosController = async (req, res) => {
  try {
    const todos = await Todo.find()
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// Obtener un todo
const getTodoByIdController = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      return res.status(404).json({ message: 'Todo no encontrado' })
    }
    res.status(200).json(todo)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// Crear todo
const createTodoController = async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body)
    res.status(201).json(newTodo)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

// Actualizar todo
const updateTodoController = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo no encontrado' })
    }
    res.status(200).json(updatedTodo); 
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// Eliminar todo
const deleteTodoController = async (req, res) => {
  try {
    const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
    if (!deleteTodo) {
      return res.status(404).json({ message: 'Todo no encontrado' })
    }
    res.status(200).json({ status: 'OK', message: 'Todo eliminado' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

module.exports = {
  getTodosController,
  getTodoByIdController,
  createTodoController,
  updateTodoController,
  deleteTodoController,
}
