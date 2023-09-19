import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from '../../app/api/helpers'
import { useGetTransactionsQuery } from './transactionsApiSlice'

export default function TransactionsList() {
  const {
    data: transactions,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTransactionsQuery()

  let content

  if (isLoading) {
    content = <h1>Loading</h1>
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
    const { ids, entities } = transactions
    if (ids.length) {
      content = (
        <div>
          <ul>
            {ids.map(id => (
              <li key={id}>{entities[id]?.title}</li>
            ))}
          </ul>
        </div>
      )
    } else {
      content = (
        <div className='flex flex-col items-center gap-8 text-center'>
          <h1 className='text-2xl font-bold text-gray-700'>Nothing to show</h1>
          <button className='rounded-lg border bg-indigo-600 p-3 text-white hover:bg-indigo-700 focus:outline-none focus-visible:bg-indigo-700'>
            Add a new transaction
          </button>
        </div>
      )
    }
  }

  return content
}
