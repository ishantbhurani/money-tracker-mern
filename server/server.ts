import express from 'express'
import { config } from 'dotenv'
config()

const PORT = process.env.PORT || 5000

const app = express()

app.get('/', (req, res) => res.send('Server is ready!'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
