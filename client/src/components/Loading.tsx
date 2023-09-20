import { AiOutlineLoading } from 'react-icons/ai'

export default function Loading() {
  return (
    <div role='status' className='flex items-center justify-center'>
      <div aria-hidden='true' className='mr-2 animate-spin text-blue-600'>
        <AiOutlineLoading className='h-10 w-10' />
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
