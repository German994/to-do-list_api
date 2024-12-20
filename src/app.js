import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { todosRouter } from './routes/todo.routes.js'
import { authRouter } from './routes/auth.routes.js'
import { usersRouter } from './routes/user.routes.js'
import { connectMongoDb } from './config/db.js'

const app = express()

app.use(express.json(), cors())

connectMongoDb()

app.use('/api/auth', authRouter)
app.use('/api/todos', todosRouter)
app.use('/api/users', usersRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`)
})
