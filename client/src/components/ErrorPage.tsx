import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  //   console.log(error)

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center'>
      <h1 className='text-3xl font-bold sm:text-4xl'>Oops!</h1>
      <p className='text-lg sm:text-xl'>
        Sorry, an unexpected error has occured.
      </p>
      <p>
        <i>
          {(isRouteErrorResponse(error) && error.statusText) ||
            (error as Error).message}
        </i>
      </p>
      <button className='mt-4 rounded border border-indigo-600 px-2 py-1.5 text-indigo-600 outline-none hover:bg-indigo-600 hover:text-white focus-visible:bg-indigo-600 focus-visible:text-white sm:p-2'>
        Go Home
      </button>
    </div>
  )
}
