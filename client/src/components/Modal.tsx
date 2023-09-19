import { useEffect, useState } from 'react'
import { useAddNewTransactionMutation } from '../features/transactions/transactionsApiSlice'
import { isErrorWithMessage, isFetchBaseQueryError } from '../app/api/helpers'
import { AiOutlineClose } from 'react-icons/ai'

type ModalProps = {
  closeModal: () => void
}

export default function Modal({ closeModal }: ModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState('')

  const [addNewTransaction, { isLoading }] = useAddNewTransactionMutation()

  useEffect(() => {
    setError('')
  }, [title, description, amount])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await addNewTransaction({
        title,
        description,
        amount,
      }).unwrap()

      setTitle('')
      setDescription('')
      setAmount(0)

      closeModal()
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : (err.data as Error).message
        setError(errMsg)
      } else if (isErrorWithMessage(err)) {
        setError(err.message)
      } else {
        setError('Something went wrong! Try again later')
      }
    }
  }

  return (
    <section className='fixed inset-0 bg-black/50'>
      <div className='mx-auto flex h-full flex-col items-center justify-center px-3 py-8 sm:px-6'>
        <div className='w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0'>
          <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <div className='flex items-center justify-between'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                Add a new transaction
              </h1>
              <button
                onClick={closeModal}
                className='text-2xl text-red-300 transition hover:text-red-500'
              >
                <AiOutlineClose />
              </button>
            </div>
            <p className='text-sm font-bold text-red-500'>{error}</p>
            <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
              <div>
                <label htmlFor='title' className='label'>
                  Title
                </label>
                <input
                  type='text'
                  name='title'
                  id='title'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className='input'
                  placeholder='Food'
                  required
                />
              </div>

              <div>
                <label htmlFor='description' className='label'>
                  Description
                </label>
                <input
                  type='text'
                  name='description'
                  id='description'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className='input'
                  placeholder='Gotta eat'
                />
              </div>

              <div>
                <label htmlFor='amount' className='label'>
                  Amount
                </label>
                <input
                  type='number'
                  name='amount'
                  id='amount'
                  value={amount}
                  onChange={e => setAmount(parseInt(e.target.value))}
                  className='input'
                  placeholder='-15000'
                  required
                />
              </div>

              <button
                type='submit'
                aria-label='Add a new transaction'
                disabled={isLoading}
                className='w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300'
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
