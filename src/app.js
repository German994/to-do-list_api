require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { todosRouter } = require('./routes/todo.routes.js')
const { authRouter } = require('./routes/auth.routes.js')
const { usersRouter } = require('./routes/user.routes.js')
const { connectMongoDb } = require('./config/db.js')

const app = express()

app.use(express.json(), cors())

connectMongoDb()

// Rutas
app.use('/api/auth', authRouter)

app.use('/api/todos', todosRouter)
app.use('/api/users', usersRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`)
})
