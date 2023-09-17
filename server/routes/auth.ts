import { Router } from 'express'
const router = Router()
import { login, logout, register } from '../controllers/auth'

router.post('/', login)
router.post('/register', register)
router.post('/logout', logout)

export default router
