import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Root() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex flex-1 bg-gray-50 p-4'>
        <Outlet />
      </main>
    </div>
  )
}
