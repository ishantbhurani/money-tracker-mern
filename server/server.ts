import express from 'express'
import { config } from 'dotenv'
config()
import cors from 'cors'
import corsOptions from './config/corsOptions'
import cookieParser from 'cookie-parser'
import { errorHandler, notFound } from './middlewares/error'
import connectDB from './config/db'
import { connection } from 'mongoose'
import authRoutes from './routes/auth'
import transactionsRoutes from './routes/transactions'

const PORT = process.env.PORT || 5000
const app = express()

connectDB()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(cookieParser())

// basic logger middleware
app.get('/', (req, res, next) => {
  console.log(req.method, req.originalUrl)
  next()
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionsRoutes)

// error middlewares
app.use(notFound)
app.use(errorHandler)

// Start listening after connecting to MongoDB
connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
