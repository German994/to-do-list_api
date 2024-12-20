import dotenv from 'dotenv'

dotenv.config()

import Todo from '../models/todo.model.js'

// Obtener todos de all users
export const getAllTodosController = async (req, res) => {
  try {
    const todos = await Todo.find() // Todas las tareas
    res.status(200).json(todos)
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'Error al obtener todos los todos' })
  }
}

// Obtener todos
export const getTodosController = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }) // Solo tareas del usuario autenticado
    res.status(200).json(todos)
  } catch (error) {
    res
      .status(500)
      .json({
        status: 'error',
        message: 'Error al obtener los todos del usuario',
      })
  }
}

// Obtener un todo
export const getTodoByIdController = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id }) // Valida que pertenezca al usuario
    if (!todo)
      return res
        .status(404)
        .json({ status: 'error', message: 'Todo no encontrado' })

    res.status(200).json(todo)
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'Error al obtener el todo' })
  }
}

// Crear todo
export const createTodoController = async (req, res) => {
  try {
    const newTodo = await Todo.create({
      ...req.body,
      user: req.user.id, // Asocia la tarea al usuario autenticado
    })
    if (!newTodo)
      return res.status(404).json({ message: 'Error al crear un nuevo todo' })

    res.status(201).json(newTodo)
  } catch (error) {
    res
      .status(400)
      .json({ status: 'error', message: 'Error al crear un nuevo todo' })
  }
}

// Actualizar todo
export const updateTodoController = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: req.params.id, user: req.user.id }, // Asegura que pertenece al usuario
      req.body,
      { new: true }
    )
    if (!updatedTodo)
      return res
        .status(404)
        .json({ status: 'error', message: 'Todo no encontrado' })

    res.status(200).json(updatedTodo)
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'Error al actualizar el todo' })
  }
}

// Eliminar todo
export const deleteTodoController = async (req, res) => {
  try {
    const deleteTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    }) // Valida propiedad
    if (!deleteTodo)
      return res.status(404).json({ message: 'Todo no encontrado' })

    res.status(200).json({ message: 'Todo eliminado' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
