import type { Request, Response } from 'express'

// @desc    Login existing user, set token
// @route   POST /api/auth
// @access  Public
export const login = (req: Request, res: Response) => {
  res.json({ message: 'User login' })
}

// @desc    Create a new user, set token
// @route   POST /api/auth/register
// @access  Public
export const register = (req: Request, res: Response) => {
  res.json({ message: 'Create a new user' })
}

// @desc    Logout user, clear token
// @route   POST /api/auth/logout
// @access  Public
export const logout = (req: Request, res: Response) => {
  res.json({ message: 'User logout' })
}
