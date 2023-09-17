import type { CorsOptions } from 'cors'
import allowedOrigins from './allowedOrigins'

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // TODO: remove !origin in production to deny access to tools like Postman
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
}

export default corsOptions
