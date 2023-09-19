import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './app/store.ts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './components/Root.tsx'
import ErrorPage from './components/ErrorPage.tsx'
import App from './App.tsx'
import RegisterPage from './features/auth/RegisterPage.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <App />,
          },
          { path: 'register', element: <RegisterPage /> },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
