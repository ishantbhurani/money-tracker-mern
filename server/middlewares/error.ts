import type { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
const { CastError } = mongoose.Error

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  if (
    err.name === 'CastError' &&
    err instanceof CastError &&
    err.kind === 'ObjectId'
  ) {
    statusCode = 404
    message = 'Resource not found'
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}
