import { Router } from 'express'
const router = Router()
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from '../controllers/transactions'

router.route('/').get(getTransactions).post(addTransaction)
router.route('/:id').put(updateTransaction).delete(deleteTransaction)

export default router
