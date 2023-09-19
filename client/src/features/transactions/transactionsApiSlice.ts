import type { EntityState } from '@reduxjs/toolkit'
import { createEntityAdapter } from '@reduxjs/toolkit'
import apiSlice from '../../app/api/apiSlice'

const TRANSACTIONS_URL = '/api/transactions'

const transactionsAdapter = createEntityAdapter<
  Transaction & { balance: number }
>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
})

const initialState = transactionsAdapter.getInitialState()

const transactionsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTransactions: builder.query<
      EntityState<Transaction & { balance: number }>,
      void
    >({
      query: () => TRANSACTIONS_URL,
      transformResponse: (
        responseData: (Transaction & { _id: string; balance: number })[],
      ) => {
        const loadedData = responseData.map(t => ({ ...t, id: t._id }))
        let balance = 0
        for (let i = 0; i < loadedData.length; ++i) {
          balance += loadedData[i].amount
          loadedData[i].balance = balance
        }
        return transactionsAdapter.setAll(initialState, loadedData)
      },
      providesTags: result =>
        result?.ids
          ? [
              { type: 'Transaction', id: 'LIST' },
              ...result?.ids.map(id => ({ type: 'Transaction' as const, id })),
            ]
          : [{ type: 'Transaction', id: 'LIST' }],
    }),
    addNewTransaction: builder.mutation<
      void,
      Omit<Transaction, 'id' | 'createdAt' | 'user'>
    >({
      query: data => ({
        url: TRANSACTIONS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
    }),
    updateTransaction: builder.mutation<void, Transaction>({
      query: data => ({
        url: `${TRANSACTIONS_URL}/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _err, arg) => [
        { type: 'Transaction', id: arg.id },
      ],
    }),
    deleteTransaction: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `${TRANSACTIONS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _err, arg) => [
        { type: 'Transaction', id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetTransactionsQuery,
  useAddNewTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApiSlice
