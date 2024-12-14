import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    is_completed: { type: Boolean, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referencia al modelo de usuario
      required: true,
    },
  },
  { timestamps: true }
)

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
