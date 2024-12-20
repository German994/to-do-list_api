import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

dotenv.config()

const REFRESH_TOKENS = [] // Lista temporal para almacenar refresh tokens. TODO guardar los REFRESH_TOKENS en una DB para la persistencia. NO APLICAR EN PRODUCCIÓN

export const generateAccessToken = (user) => {
  const { _id, username, email } = user
  return jwt.sign({ id: _id, username, email }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  })
}

export const generateRefreshToken = (user) => {
  const { _id, username, email } = user
  return jwt.sign({ id: _id, username, email }, process.env.REFRESH_JWT_SECRET)
}

export const registerController = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists)
      return res.status(400).json({ message: 'El usuario ya existe' })

    const user = await User.create({ username, email, password })

    res.status(201).json({
      user: { id: user._id, username, email }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error })
  }
}

export const loginController = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid)
      return res.status(400).json({ message: 'Credenciales inválidas' })

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    REFRESH_TOKENS.push(refreshToken)

    res.status(200).json({
      user: { id: user._id, username: user.username, email },
      accessToken,
      refreshToken,
    })
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error })
  }
}

export const meController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password') // Excluye el campo "password"

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json(user)
  } catch (error) {
    console.error('Error en /me:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}

// https://www.youtube.com/watch?v=mbsmsi7l3r4&t=842s

export const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken)
    return res.status(401).json({ message: 'Refresh token is required' })
  if (!REFRESH_TOKENS.includes(refreshToken)) {
    return res.status(403).json({ message: 'Invalid refresh token' })
  }

  jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' })

    const newAccessToken = generateAccessToken(user)
    res.json({ accessToken: newAccessToken })
  })
}

// TODO fix logoutController

export const logoutController = async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return res
      .status(400)
      .json({ message: 'El token de refresco es requerido' })
  }

  const index = REFRESH_TOKENS.indexOf(refreshToken)
  if (index === -1) {
    return res.status(404).json({ message: 'Token de refresco no encontrado' })
  }

  // Eliminar el token del arreglo
  REFRESH_TOKENS.splice(index, 1)

  res.status(200).json({ message: 'Cierre de sesión exitoso' })
}
