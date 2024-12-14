import dotenv from 'dotenv'
dotenv.config();

import mongoose from 'mongoose'

export const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Conectado a MongoDB')
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error)
    process.exit(1)
  }
}
