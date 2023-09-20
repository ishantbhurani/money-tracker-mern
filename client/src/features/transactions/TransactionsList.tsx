import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from '../../app/api/helpers'
import Loading from '../../components/Loading'
import TransactionItem from './TransactionItem'
import { useGetTransactionsQuery } from './transactionsApiSlice'

type TransactionsListProps = {
  openModal: () => void
}

export default function TransactionsList({ openModal }: TransactionsListProps) {
  const {
    data: transactions,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTransactionsQuery()

  let content

  if (isLoading) {
    content = <Loading />
  }

  if (isError) {
    let err

    if (isFetchBaseQueryError(error)) {
      err =
        'error' in error
          ? error.error
          : (error.data as Error)?.message ?? 'Server error'
    } else if (isErrorWithMessage(err)) {
      err = error.message
    } else {
      err = 'Something went wrong! Try again later'
    }

    content = (
      <p className='text-center text-sm font-bold text-red-500 sm:text-base'>
        {err}
      </p>
    )
  }

  if (isSuccess) {
    const { ids } = transactions

    if (ids.length) {
      const tableContent = ids.map(id => (
        <TransactionItem key={id} transactionId={id} openModal={openModal} />
      ))

      content = (
        <table className='w-full text-left text-sm text-gray-500 md:text-base'>
          <thead className='bg-indigo-50 text-xs uppercase text-gray-700 md:text-sm'>
            <tr className='grid grid-cols-5 gap-4 text-center sm:grid-cols-6'>
              <th scope='col' className='py-3'>
                Date
              </th>
              <th scope='col' className='py-3'>
                Title
              </th>
              <th scope='col' className='hidden py-3 sm:block'>
                Details
              </th>
              <th scope='col' className='py-3'>
                Amount
              </th>
              <th scope='col' className='py-3'>
                Balance
              </th>
              <th scope='col' className='py-3'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      )
    } else {
      content = (
        <div className='flex flex-col items-center gap-8 text-center'>
          <h1 className='text-2xl font-bold text-gray-700'>Nothing to show</h1>
          <button
            onClick={openModal}
            className='rounded-lg border bg-indigo-600 p-3 text-white hover:bg-indigo-700 focus:outline-none focus-visible:bg-indigo-700'
          >
            Add a new transaction
          </button>
        </div>
      )
    }
  }

  return content
}
