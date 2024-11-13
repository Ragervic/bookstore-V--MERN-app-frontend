import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegCopyright } from 'react-icons/fa'
import axios from "axios"
import getBaseUrl from '../utils/baseURL'
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom'

const AdminLogin = () => {

    const {message,setMessage}= useState("")
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const auth = response.data
            console.log(auth)

            if (auth.token) {
                localStorage.setItem('token', auth.token)
                setTimeout(() => {
                    localStorage.removeItem('token')
                    Swal.fire({
                        title: 'Token expired! Please login again!!',
                        timer: 2000,
                        icon:'error'
                    })
                    navigate("/")
                },3600*1000)
                
            }
            Swal.fire({
                title: 'Admin log-in successful',
                icon: 'success',
                timer:2000
            })
            navigate("/dashboard")
        } catch (error) {
            console.error({ message:"Error logging in!",error });

        }
        
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Please Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='mb-4'>
                        <label htmlFor="username" className='block text-gray-700 mb-2 font-bold'>Username</label>
                        <input {...register("username", { required: true })} type="text" name='username' id='username' placeholder='username' className='shadow appearance-none mt-4 p-2 text-md bg-gray-200 border rounded w-full px-3 py-2 leading-tight focus:outline-none focus:shadow' />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="password" className='block text-gray-700 mb-2 mt-2 font-bold'>Password</label>
                        <input {...register("password", { required: true })} type="password" name='password' id='password' placeholder='***********' className='shadow appearance-none mt-4 p-2 text-md bg-gray-200 border rounded w-full px-3 py-2 leading-tight focus:outline-none focus:shadow' />
                    </div>
                    {
                        message && <p className='text-xs italic mb-3 text-red-500 '>{message}</p>
                    }
                    <div>
                        <button className='bg-blue-500 w-full rounded  py-2 px-6 hover:bg-blue-700 font-bold text-black focus:outline-none'>Login</button>
                    </div>
                </form>
                {/* Rights */}
                <div className='flex gap-2 ps-10 text-xs mt-4 items-center font-semibold'>
                    <FaRegCopyright className='size-3' />
                    <p>2025 Book Store.All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin