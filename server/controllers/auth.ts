import type { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/User'

// @desc    Login existing user, set token
// @route   POST /api/auth
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Email and Password are required')
  }

  const foundUser = await User.findOne({ email }).exec()

  if (foundUser && (await foundUser.matchPassword(password))) {
    // TODO: generate token, set cookie

    res.json({
      id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Create a new user, set token
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('All fields are required')
  }

  const duplicate = await User.findOne({ email }).lean().exec()
  if (duplicate) {
    res.status(409)
    throw new Error('User already exists')
  }

  // password hashing is handled in model
  const user = await User.create({ name, email, password })

  if (!user) {
    res.status(400)
    throw new Error('Invalid user data')
  }

  // TODO: generate token, set cookie

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
  })
})

// @desc    Logout user, clear token
// @route   POST /api/auth/logout
// @access  Public
export const logout = (_req: Request, res: Response) => {
  // TODO: clear cookie
  res.sendStatus(204)
}
