const express = require('express')
const { registerController, loginController } = require('../controllers/auth.controller')
const { protected } = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/protected', protected)

module.exports = {
  authRouter: router,
}
