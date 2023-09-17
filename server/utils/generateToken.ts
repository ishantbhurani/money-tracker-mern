import type { Response } from 'express'
import { Types } from 'mongoose'
import { sign } from 'jsonwebtoken'

const generateToken = (res: Response, userId: Types.ObjectId) => {
  const payload = { userId }
  const token = sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' })

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
}

export default generateToken
