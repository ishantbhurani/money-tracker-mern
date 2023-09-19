import type { EntityId } from '@reduxjs/toolkit'
import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from './transactionsApiSlice'
import { cn } from '../../utils'
import { memo } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

type TransactionItemProps = {
  transactionId: EntityId
  openModal: (id?: string) => void
}

export default memo(function TransactionItem({
  transactionId,
  openModal,
}: TransactionItemProps) {
  const { transaction } = useGetTransactionsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      transaction: data?.entities[transactionId],
    }),
  })

  const [deleteApi, { isLoading: isDelLoading }] =
    useDeleteTransactionMutation()

  if (transaction) {
    const created = new Date(transaction.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

    const handleDelete = async () => {
      try {
        await deleteApi({ id: transactionId.toString() }).unwrap()
      } catch (err) {
        console.error(err)
      }
    }

    return (
      <tr className='grid grid-cols-5 gap-4 border-b bg-white text-center hover:bg-indigo-50/50 sm:grid-cols-6'>
        <th scope='row' className='py-4 font-medium text-gray-900'>
          {created}
        </th>
        <td className='py-4'>{transaction.title}</td>
        <td className='hidden py-4 sm:block'>
          {transaction.description || 'NA'}
        </td>
        <td
          className={cn('py-4', {
            'text-red-500': transaction.amount < 0,
            'text-green-500': transaction.amount >= 0,
          })}
        >
          {transaction.amount}
        </td>
        <td
          className={cn('py-4', {
            'text-red-500': transaction.balance < 0,
            'text-green-500': transaction.balance > 0,
          })}
        >
          {transaction.balance}
        </td>
        <td className=' space-x-2 py-4 sm:space-x-4'>
          <button
            title='Edit'
            onClick={() => openModal(transaction.id)}
            aria-label={`Edit transaction ${'title'}`}
            className='text-2xl text-indigo-300 outline-none hover:text-indigo-500 focus-visible:text-indigo-500'
          >
            <AiFillEdit />
          </button>
          <button
            title='Delete'
            aria-label={`Delete transaction ${'title'}`}
            onClick={handleDelete}
            disabled={isDelLoading}
            className='text-2xl text-red-300 outline-none hover:text-red-500 focus-visible:text-red-500'
          >
            <AiFillDelete />
          </button>
        </td>
      </tr>
    )
  } else return null
})
