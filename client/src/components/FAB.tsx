import { AiOutlinePlus } from 'react-icons/ai'

type FABProps = {
  openModal: () => void
}

export default function FAB({ openModal }: FABProps) {
  return (
    <div className='fixed bottom-6 right-4 md:bottom-8 md:right-8'>
      <button
        title='Add'
        onClick={openModal}
        aria-label='Add a new transaction'
        className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 p-0 text-2xl text-white shadow outline-none transition duration-200 ease-in hover:animate-bounce hover:bg-indigo-700 focus:animate-bounce focus:bg-indigo-700 active:shadow-lg sm:h-12 sm:w-12'
      >
        <AiOutlinePlus />
      </button>
    </div>
  )
}
