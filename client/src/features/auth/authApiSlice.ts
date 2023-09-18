import apiSlice from '../../app/api/apiSlice'
import { logout } from './authSlice'

const AUTH_URL = '/api/auth'

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<User, { email: string; password: string }>({
      query: data => ({
        url: AUTH_URL,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation<
      User,
      { name: string; email: string; password: string }
    >({
      query: data => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(logout())
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
        } catch (err) {
          console.error(err)
        }
      },
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApiSlice
