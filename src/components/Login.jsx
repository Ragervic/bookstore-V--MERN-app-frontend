import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaRegCopyright } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [message, setMessage] = useState("");
  const { userLogin, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  // Useform from react-hook
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    console.log(data)
    try {
      await userLogin(data.email, data.password)
      Swal.fire({
        title: "Log-in",
        text: "User log-in successfull!!",
        icon: "success",
        showConfirmButton: false,
        timer: 800
      })
      navigate('/')
    } catch (error) {
      console.error(error)
      setMessage("Please provide a valid email and password!!")
      // Swal.fire({
      //   title: "Log-in",
      //   text: "Failed to log-in!!",
      //   icon: "error"
      // })
    }
  }
  const handleGoogleSignIn = async () => { 
    try {
      await signInWithGoogle();
      navigate('/')
    } catch (error) {
      console.error(error)
      Swal.fire({
        title: "Google Sign-in",
        text: "Failed to sign-in!!",
        icon: "error"
      })
    }
  };

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl font-semibold mb-4'>Please Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} >
          <div className='mb-4'>
            <label htmlFor="Email" className='block text-gray-700 mb-2 font-bold'>Email</label>
            <input {...register("email", { required: true })} type="email" name='email' id='email' placeholder='username@gmail.com' className='shadow appearance-none mt-4 p-2 text-md bg-gray-200 border rounded w-full px-3 py-2 leading-tight focus:outline-none focus:shadow' />
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700 mb-2 mt-2 font-bold'>Password</label>
            <input {...register("password", { required: true })} type="password" name='password' id='password' placeholder='***********' className='shadow appearance-none mt-4 p-2 text-md bg-gray-200 border rounded w-full px-3 py-2 leading-tight focus:outline-none focus:shadow' />
          </div>
          {
            message && <p className='text-xs italic mb-3 text-red-500 '>{message}</p>
          }
          <div>
            <button className='bg-blue-500 rounded py-2 px-6 hover:bg-blue-700 font-bold text-black focus:outline-none'>Login</button>
          </div>
        </form>
        <div>
          <p className='font-semibold mt-4 align-baseline text-sm'>Don't have an account?<a href='/register' className='text-blue-500 hover:text-blue-700'>Register here</a></p>
        </div>
        {/* Google sign-in */}
        <div className='mt-4'>
          <button onClick={handleGoogleSignIn} className='flex flex-wrap align-baseline gap-2 items-center bg-gray-200 hover:bg-blue-500 mx-auto rounded py-2 px-6 font-bold text-black focus:outline-none '>
            <FcGoogle className='size-6' />
            <p>Sign-in with Google</p>
          </button>
        </div>
        {/* Rights */}
        <div className='flex gap-2 ps-10 text-xs mt-4 items-center font-semibold'>
          <FaRegCopyright className='size-3' />
          <p>2025 Book Store.All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Login