import express from 'express'
import { config } from 'dotenv'
config()

const PORT = process.env.PORT || 5000
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// basic logger middleware
app.get('/', (req, res, next) => {
  console.log(req.method, req.originalUrl)
  next()
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
