import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://money-tracker-mern.vercel.app/',
    credentials: 'include',
  }),
  tagTypes: ['Transaction'],
  endpoints: _builder => ({}),
})

export default apiSlice
