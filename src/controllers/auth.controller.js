require('dotenv').config()

const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const registerController = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: 'El usuario ya existe' })

    const user = await User.create({ username, email, password })
    const token = generateToken(user._id)

    res.status(201).json({ user: { id: user._id, username, email }, token })
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error })
  }
}

const loginController = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) return res.status(400).json({ message: 'Credenciales inválidas' })

    const token = generateToken(user._id)
    res
      .status(200)
      .json({ user: { id: user._id, username: user.username, email }, token })
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error })
  }
}

module.exports = {
  registerController,
  loginController,
}
