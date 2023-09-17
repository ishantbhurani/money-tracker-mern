import express from 'express'
import { config } from 'dotenv'
config()
import cors from 'cors'
import corsOptions from './config/corsOptions'
import cookieParser from 'cookie-parser'
import { errorHandler, notFound } from './middlewares/error'

const PORT = process.env.PORT || 5000
const app = express()

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

// error middlewares
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
