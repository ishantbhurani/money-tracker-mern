import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='container mx-auto flex items-center justify-between gap-4 border-b p-4 text-gray-900 sm:text-lg'>
      <div>
        <Link to='/' className='text-xl font-bold sm:text-2xl'>
          Expenses
        </Link>
      </div>
    </header>
  )
}
