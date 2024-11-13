import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'


const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token')
        if (Headers) {
            Headers.set('Authorization', `Bearer${token}`)
        }
        return Headers
    }
})

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ["Books"],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),
        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Books", id }],
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                method: `POST`,
                body: newBook,
                url: `/create-book`
            }),
            invalidatesTags: ["Books"]
        }),
        updateBook: builder.mutation({
            query: ({ id, ...rest }) => ({
                method: `PUT`,
                body: rest,
                url: `/edit/${id}`,
            }),
            invalidatesTags: ["Books"]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: `DELETE`
            }),
            invalidatesTags: ["Books"]
        })

    })
})


export const { useFetchAllBooksQuery, useFetchBookByIdQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation } = booksApi
export default booksApi
