import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { useLogoutMutation } from '../features/auth/authApiSlice'
import { cn } from '../utils'

export default function Header() {
  const { userInfo } = useAppSelector(state => state.auth)

  const navigate = useNavigate()

  const [logoutApi, { isLoading }] = useLogoutMutation()

  const handleClick = async () => {
    try {
      await logoutApi().unwrap()
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header className='container mx-auto flex items-center justify-between gap-4 border-b p-4 text-gray-900 sm:text-lg'>
      <div>
        <Link to='/' className='text-xl font-bold sm:text-2xl'>
          Expenses
        </Link>
      </div>
      <nav>
        <ul className='flex items-center justify-center gap-4'>
          {userInfo ? (
            <>
              <li>{userInfo.name}</li>
              <li>
                <button
                  onClick={handleClick}
                  disabled={isLoading}
                  className='rounded border border-indigo-600 px-2 py-1.5 text-indigo-600 outline-none hover:bg-indigo-600 hover:text-white focus-visible:bg-indigo-600 focus-visible:text-white sm:p-2'
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to='login'
                  className={({ isActive }) =>
                    cn('hover:text-indigo-500', {
                      'text-indigo-600': isActive,
                    })
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='register'
                  className={({ isActive }) =>
                    cn('text-lg hover:text-indigo-500', {
                      'text-indigo-600': isActive,
                    })
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
