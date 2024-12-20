import User from '../models/user.model.js'

// Obtener usuarios
export const getUsersController = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// Obtener un usuario
export const getUserByIdController = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
    
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// Crear usuario
export const createUserController = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

// Actualizar usuario
export const updateUserController = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' })
    
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

// Eliminar usuario
export const deleteUserController = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id)
    if (!deleteUser) return res.status(404).json({ message: 'Usuario no encontrado' })
    
    res.status(200).json({ status: 'OK', message: 'Usuario eliminado' })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
