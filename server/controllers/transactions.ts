import type { Request, Response } from 'express'
import type { AuthRequestType } from '../middlewares/auth'
import asyncHandler from 'express-async-handler'
import Transaction from '../models/Transaction'
import User from '../models/User'

// @desc    Get all transactions of current user
// @route   GET /api/transactions
// @access  Private
export const getTransactions = asyncHandler(
  async (req: AuthRequestType, res: Response) => {
    const transactions = await Transaction.find({ user: req.user })
      .lean()
      .exec()
    res.json(transactions)
  }
)

// @desc    Add a new transaction
// @route   POST /api/transactions
// @access  Private
export const addTransaction = asyncHandler(
  async (req: AuthRequestType, res: Response) => {
    const { title, description, amount }: TransactionType = req.body
    const userId = req.user

    if (!title || !amount) {
      res.status(400)
      throw new Error('All fields are required')
    }

    const transaction = await Transaction.create({
      title,
      description,
      amount,
      user: userId,
    })

    if (!transaction) {
      res.status(400)
      throw new Error('Invalid data received')
    }

    res.status(201).json(transaction)
  }
)

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = asyncHandler(
  async (req: AuthRequestType, res: Response) => {
    const { id } = req.params
    const {
      title,
      description,
      amount,
      user,
    }: TransactionType & { user: string } = req.body
    const userId = req.user

    if (!title || !amount) {
      res.status(400)
      throw new Error('All fields are required')
    }

    const foundTransaction = await Transaction.findById(id).exec()

    if (!foundTransaction) {
      res.status(400)
      throw new Error('Transaction not found')
    }

    const foundUser = await User.findById(userId)
      .select('-password')
      .lean()
      .exec()

    if (!foundUser || foundUser._id.toString() !== user) {
      res.status(403)
      throw new Error('Forbidden')
    }

    foundTransaction.title = title
    if (description) foundTransaction.description = description
    foundTransaction.amount = amount

    const updatedTransaction = await foundTransaction.save()

    res.json(updatedTransaction)
  }
)

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = asyncHandler(
  async (req: AuthRequestType, res: Response) => {
    const { id } = req.params
    const userId = req.user

    const transaction = await Transaction.findById(id).exec()

    if (!transaction) res.sendStatus(204)
    else {
      if (transaction.user.toString() === userId?.toString()) {
        const deletedTransaction = await transaction.deleteOne()
        res.json(deletedTransaction)
      } else {
        res.status(403)
        throw new Error('Forbidden')
      }
    }
  }
)
