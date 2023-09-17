import type { Request, Response } from 'express'

// @desc    Get all transactions of current user
// @route   GET /api/transactions
// @access  Private
export const getTransactions = (req: Request, res: Response) => {
  res.json({ message: 'Get all transactions' })
}

// @desc    Add a new transaction
// @route   POST /api/transactions
// @access  Private
export const addTransaction = (req: Request, res: Response) => {
  res.json({ message: 'Add a new transaction' })
}

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = (req: Request, res: Response) => {
  res.json({ message: 'Update a transaction' })
}

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = (req: Request, res: Response) => {
  res.json({ message: 'Delete a transaction' })
}
