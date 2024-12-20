import express from 'express'

import {
  registerController,
  loginController,
  refreshTokenController,
  authenticateTokenController,
  meController,
  logoutController,
} from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/me', authenticateTokenController, meController)

router.post('/refresh-token', refreshTokenController)
router.delete('/logout', logoutController)

export const authRouter = router
