import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: 'include'
})


const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery,
    tagTypes:["orders"],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body:newOrder,
                credentials:'include'
            })
        }),
        getOrdersByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`,
                method:"GET"
            }),
            providesTags:['orders']
        })
    })
})

export const {useCreateOrderMutation, useGetOrdersByEmailQuery } = ordersApi
export default ordersApi