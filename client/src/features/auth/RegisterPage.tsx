import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useRegisterMutation } from './authApiSlice'
import { setCredentials } from './authSlice'
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from '../../app/api/helpers'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [registerApi, { isLoading }] = useRegisterMutation()

  const { userInfo } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (userInfo) navigate('/')
  }, [userInfo])

  useEffect(() => {
    setError('')
  }, [name, email, password, confirmPassword])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const res = await registerApi({ name, email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      navigate('/')
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
    <section className='flex-1 bg-gray-50'>
      <div className='mx-auto flex flex-col items-center justify-center px-3 py-8 sm:px-6'>
        <div className='w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0'>
          <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Create a new account
            </h1>
            <p className='text-sm font-bold text-red-500'>{error}</p>
            <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
              <div>
                <label htmlFor='name' className='label'>
                  Your name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className='input'
                  placeholder='John Doe'
                  required
                />
              </div>

              <div>
                <label htmlFor='email' className='label'>
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='input'
                  placeholder='name@company.com'
                  required
                />
              </div>

              <div>
                <label htmlFor='password' className='label'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder='••••••••'
                  className='input'
                  required
                />
              </div>

              <div>
                <label htmlFor='confirmPassword' className='label'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  name='confirmPassword'
                  id='confirmPassword'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder='••••••••'
                  className='input'
                  required
                />
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300'
              >
                Sign up
              </button>
              <p className='text-sm font-light text-gray-500'>
                Already have an account?
                <Link
                  to='/login'
                  className='pl-1 font-medium text-indigo-600 hover:underline'
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
