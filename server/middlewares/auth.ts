import type { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import { verify } from 'jsonwebtoken'
import { Types } from 'mongoose'

export interface AuthRequestType extends Request {
  user?: Types.ObjectId
}

interface TokenType {
  userId: Types.ObjectId
}

export const protect = asyncHandler(
  async (req: AuthRequestType, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt as string

    if (token) {
      try {
        const decoded = verify(token, process.env.JWT_SECRET!)
        req.user = (decoded as TokenType).userId

        next()
      } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized, invalid token')
      }
    } else {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  }
)
