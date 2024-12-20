import express from 'express'

import {
  registerController,
  loginController,
  refreshTokenController,
  meController,
  logoutController,
} from '../controllers/auth.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/me', authenticateToken, meController)

router.post('/refresh-token', refreshTokenController)
router.delete('/logout', logoutController)

export const authRouter = router
