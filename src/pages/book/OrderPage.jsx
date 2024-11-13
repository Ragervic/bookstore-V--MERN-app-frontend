import React from 'react'
import { useGetOrdersByEmailQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext'

const OrderPage = () => {
    const {currentUser} = useAuth()
    const {data: orders=[],isLoading,isError}=useGetOrdersByEmailQuery(currentUser.email)
    if (isLoading) return <div>Loading...</div>
    if(isError) return <div>Error getting orders!!</div>
  return (
      <div className='mx-auto p-6 container'>
          <h2 className='font-semibold mb-4 text-2xl'>Your orders</h2>
          {
              orders.length === 0 ? (<div>No orders found!</div>) : (<div>
                  {
                      orders.map((order, index) => (
                          <div key={order._id} className='mb-4 pb-4 border-b'>
                              <p className='p-1 bg-secondary text-white w-10 rounded mb-1'># {index + 1}</p>
                              <h2 className='font-bold'>Order Id: {order?._id}</h2>
                              <p className='text-gray-600'>Name: {order.name}</p>
                              <p className='text-gray-600'>Email: {order.email}</p>
                              <p className='text-gray-600'>Phone: {order.phone}</p>
                              <p className='text-gray-600'>Total Price: ${order.totalPrice}</p>
                              <h3 className='font-semibold mt-2'>Address:</h3>
                              <p>{order.address.street},{order.address.city},{order.address.state},{order.address.country},{order.address.zipcode}</p>
                              <h3 className='font-semibold mt-2'>Book Id:</h3>
                              <ul>
                                  {
                                      order.opusIds.map((opusId) => {
                                          <li key={opusId}>{ opusId}</li>
                                      })
                                  }
                              </ul>
                          </div>
                      ))  
                  }
              </div>)
          }
    </div>
  )
}

export default OrderPage