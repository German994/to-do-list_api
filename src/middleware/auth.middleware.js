import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'No autorizado, falta token' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({ message: 'Token inválido' })
  }
}
