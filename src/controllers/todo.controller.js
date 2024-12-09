require('dotenv').config()

const Todo = require('../models/todo.model')

// Obtener todos
const getTodosController = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }); // Solo tareas del usuario autenticado
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// Obtener un todo
const getTodoByIdController = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id }); // Valida que pertenezca al usuario
    if (!todo) return res.status(404).json({ message: 'Todo no encontrado' })

    res.status(200).json(todo)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}


// Crear todo
const createTodoController = async (req, res) => {
  try {
    const newTodo = await Todo.create({
      ...req.body,
      user: req.user.id, // Asocia la tarea al usuario autenticado
    });

    res.status(201).json({status: 'OK', message: 'Todo creado correctamente', data: newTodo})
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Error al crear un nuevo todo' })
  }
}

// Actualizar todo
const updateTodoController = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: req.params.id, user: req.user.id }, // Asegura que pertenece al usuario
      req.body,
      { new: true }
    )
    if (!updatedTodo)
      return res.status(404).json({ message: 'Todo no encontrado' })

    res.status(200).json(updatedTodo)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// Eliminar todo
const deleteTodoController = async (req, res) => {
  try {
    const deleteTodo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id }); // Valida propiedad
    if (!deleteTodo)
      return res.status(404).json({ message: 'Todo no encontrado' })

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
