import express from 'express'

import {
  registerController,
  loginController,
} from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/protected', authMiddleware)

export const authRouter = router
